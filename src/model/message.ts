import { User } from './room/user'

export enum Notification {
  JOINROOM,
  LEAVEROOM
}

export type MessageContent = Notification | string

export interface Message<X extends MessageContent> {
  readonly content: X
  readonly sender: User

  get getContent(): X

  get getSender(): User
}

export class NotificationMessage implements Message<Notification> {
  content: Notification
  sender: User
  type = 'notificationMessage'

  constructor(sender: User, notification: Notification) {
    this.content = notification
    this.sender = sender
  }

  get getContent(): Notification {
    return this.content
  }

  get getSender(): User {
    return this.sender
  }
}

export class TextMessage implements Message<string> {
  content: string
  sender: User
  type = 'textMessage'

  constructor(sender: User, text: string) {
    this.content = text
    this.sender = sender
  }

  get getContent(): string {
    return this.content
  }

  get getSender(): User {
    return this.sender
  }
}

export class ChatUpdate {
  readonly notificationMessage: NotificationMessage
  readonly messages: TextMessage[]

  constructor(notificationMessage: NotificationMessage, messages: TextMessage[]) {
    this.notificationMessage = notificationMessage
    this.messages = messages
  }
}

export enum Ack {
  OK = 0,
  FAILURE = 1
}
