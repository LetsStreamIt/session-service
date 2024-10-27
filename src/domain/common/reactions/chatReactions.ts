import { NotificationMessage, TextMessage } from '../../aggregates/chat/message'

/**
 * Chat Reaction Type
 */
export enum ChatReactionType {
  NOTIFICATION_MESSAGE = 'notificationMessage',
  TEXT_MESSAGE = 'textMessage'
}

/**
 * Chat Reactions Interface
 */
export interface IChatReactions {
  /**
   * Emits a Notification Message to all the clients connected to the Session
   * @param notificationMessage Notification Message
   */
  emitNotificationToSession(notificationMessage: NotificationMessage): void

  /**
   * Emits all messages to a single client
   * @param textMessages Text Message(s)
   */
  emitTextMessagesToClient(...textMessages: TextMessage[]): void

  /**
   * Emits all messages to all the clients connected to the Session
   * @param textMessages Text Message(s)
   */
  emitTextMessagesToSession(...textMessages: TextMessage[]): void
}
