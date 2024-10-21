import { NotificationMessage, TextMessage } from '../aggregates/chat/message'

export enum ChatReactionType {
  NOTIFICATION_MESSAGE = 'notificationMessage',
  TEXT_MESSAGE = 'textMessage'
}

export interface ChatReactions {
  sendNotificationToSession(notificationMessage: NotificationMessage): void
  emitTextMessagesToClient(...textMessages: TextMessage[]): void
  sendTextMessagesToSession(...textMessages: TextMessage[]): void
}
