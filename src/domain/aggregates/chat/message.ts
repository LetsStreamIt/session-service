import { User } from '../../user'

/**
 * Join Notification
 */
export enum JoinNotification {
  JOIN_SESSION,
  LEAVE_SESSION
}

/** Message Content is a Join Notification Message or a string representing the text message */
export type MessageContent = JoinNotification | string

/**
 * Message Interface
 */
export interface IMessage<X extends MessageContent> {
  get getContent(): X

  get getSender(): User
}

/**
 * Notification Message
 */
export class NotificationMessage implements IMessage<JoinNotification> {
  private readonly content: JoinNotification
  private readonly sender: User

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

/**
 * Text Message
 */
export class TextMessage implements IMessage<string> {
  private readonly content: string
  private readonly sender: User

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
