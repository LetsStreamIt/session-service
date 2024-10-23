import { ISessionEvent, EventType } from '../../../event/event'
import { ISessionReactions } from '../../../reactions/sessionReactions'
import { TextMessage } from '../message'

/**
 * Message Sent Event
 */
export class MessageSentEvent implements ISessionEvent {
  private readonly type: EventType
  private readonly sessionReactions: ISessionReactions
  private readonly textMessage: TextMessage

  constructor(textMessage: TextMessage, sessionReactions: ISessionReactions) {
    this.type = EventType.MessageSent
    this.sessionReactions = sessionReactions
    this.textMessage = textMessage
  }

  get getTextMessage(): TextMessage {
    return this.textMessage
  }

  get getType(): EventType {
    return this.type
  }

  get getSessionReactions(): ISessionReactions {
    return this.sessionReactions
  }
}
