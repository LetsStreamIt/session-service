import { ISessionEvent, EventType } from '../../../common/event/event'
import { ISessionReactions } from '../../../common/reactions/sessionReactions'
import { TextMessage } from '../message'

/**
 * Message Sent Event
 */
export class MessageSentEvent implements ISessionEvent {
  readonly type: EventType
  readonly reactions: ISessionReactions
  readonly textMessage: TextMessage

  constructor(textMessage: TextMessage, reactions: ISessionReactions) {
    this.type = EventType.MessageSent
    this.reactions = reactions
    this.textMessage = textMessage
  }
}
