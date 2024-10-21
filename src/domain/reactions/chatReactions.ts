import { NotificationMessage, TextMessage } from '../../application/session/message'

export interface ChatReactions {
  sendNotificationToSession(notificationMessage: NotificationMessage): void
  emitTextMessagesToClient(...textMessages: TextMessage[]): void
  sendTextMessagesToSession(...textMessages: TextMessage[]): void
}
