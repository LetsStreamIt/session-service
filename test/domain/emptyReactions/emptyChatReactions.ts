import { NotificationMessage, TextMessage } from '../../../src/domain/aggregates/chat/message'
import { IChatReactions } from '../../../src/domain/reactions/chatReactions'

export class EmptyChatReactions implements IChatReactions {
  sendNotificationToSession(_notificationMessage: NotificationMessage): void {
    throw new Error('Method should not be used for testing.')
  }
  emitTextMessagesToClient(..._textMessages: TextMessage[]): void {
    throw new Error('Method should not be used for testing.')
  }
  sendTextMessagesToSession(..._textMessages: TextMessage[]): void {
    throw new Error('Method should not be used for testing.')
  }
}
