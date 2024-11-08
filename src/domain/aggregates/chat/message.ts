import { User } from '../../common/user'

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
  readonly content: X
  readonly sender: User
}

/**
 * Notification Message
 */
export class NotificationMessage implements IMessage<JoinNotification> {
  readonly content: JoinNotification
  readonly sender: User

  constructor(sender: User, notification: JoinNotification) {
    this.content = notification
    this.sender = sender
  }
}

/**
 * Text Message
 */
export class TextMessage implements IMessage<string> {
  readonly content: string
  readonly sender: User

  constructor(sender: User, text: string) {
    this.content = text
    this.sender = sender
  }
}
