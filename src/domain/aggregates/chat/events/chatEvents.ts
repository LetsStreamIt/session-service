import { SessionEvent, EventType } from '../../../event/event'
import { SessionReactions } from '../../../reactions/sessionReactions'
import { TextMessage } from '../message'

export class MessageSentEvent implements SessionEvent {
  type: EventType
  sessionReactions: SessionReactions
  textMessage: TextMessage

  constructor(textMessage: TextMessage, sessionReactions: SessionReactions) {
    this.type = EventType.MessageSent
    this.sessionReactions = sessionReactions
    this.textMessage = textMessage
  }
}
