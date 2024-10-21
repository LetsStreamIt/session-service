import { ISessionEvent, EventType } from '../../../event/event'
import { ISessionReactions } from '../../../reactions/sessionReactions'
import { TextMessage } from '../message'

export class MessageSentEvent implements ISessionEvent {
  type: EventType
  sessionReactions: ISessionReactions
  textMessage: TextMessage

  constructor(textMessage: TextMessage, sessionReactions: ISessionReactions) {
    this.type = EventType.MessageSent
    this.sessionReactions = sessionReactions
    this.textMessage = textMessage
  }
}
