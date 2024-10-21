import { User } from './user'

export enum JoinNotification {
  JOIN_SESSION,
  LEAVE_SESSION
}

export type MessageContent = JoinNotification | string

export interface Message<X extends MessageContent> {
  readonly content: X
  readonly sender: User

  get getContent(): X

  get getSender(): User
}

export class NotificationMessage implements Message<JoinNotification> {
  content: JoinNotification
  sender: User
  type = 'notificationMessage'

  constructor(sender: User, notification: JoinNotification) {
    this.content = notification
    this.sender = sender
  }

  get getContent(): JoinNotification {
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
