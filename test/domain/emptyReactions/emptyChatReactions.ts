import { NotificationMessage, TextMessage } from '../../../src/domain/aggregates/chat/message'
import { IChatReactions } from '../../../src/domain/reactions/chatReactions'

export class EmptyChatReactions implements IChatReactions {
  sendNotificationToSession(notificationMessage: NotificationMessage): void {
    throw new Error('Method should not be used for testing.')
  }
  emitTextMessagesToClient(...textMessages: TextMessage[]): void {
    throw new Error('Method should not be used for testing.')
  }
  sendTextMessagesToSession(...textMessages: TextMessage[]): void {
    throw new Error('Method should not be used for testing.')
  }
}
