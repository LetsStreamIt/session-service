import { NotificationMessage, TextMessage } from '../../../src/domain/aggregates/chat/message'
import { IChatReactions } from '../../../src/domain/common/reactions/chatReactions'

export class EmptyChatReactions implements IChatReactions {
  emitNotificationToSession(_notificationMessage: NotificationMessage): void {
    throw new Error('Method should not be used for testing.')
  }
  emitTextMessagesToClient(..._textMessages: TextMessage[]): void {
    throw new Error('Method should not be used for testing.')
  }
  emitTextMessagesToSession(..._textMessages: TextMessage[]): void {
    throw new Error('Method should not be used for testing.')
  }
}
