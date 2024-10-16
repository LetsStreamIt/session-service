import { SessionNotifications } from '../../../../../presentation/notifications/sessionNotifications'
import { SessionEvent, EventType } from '../../../../event/event'
import { TextMessage } from '../../../message'

export class MessageSentEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  textMessage: TextMessage

  constructor(textMessage: TextMessage, notifications: SessionNotifications) {
    this.type = EventType.MessageSent
    this.notifications = notifications
    this.textMessage = textMessage
  }
}
