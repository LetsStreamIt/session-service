import { ISessionEvent, EventType } from '../../../common/event/event'
import { ISessionReactions } from '../../../common/reactions/sessionReactions'

/**
 * Video Played Event
 */
export class VideoPlayedEvent implements ISessionEvent {
  readonly type: EventType
  readonly reactions: ISessionReactions
  readonly timestamp: number

  constructor(timestamp: number, reactions: ISessionReactions) {
    this.type = EventType.VideoPlayed
    this.reactions = reactions
    this.timestamp = timestamp
  }
}

/**
 * Video Stopped Event
 */
export class VideoStoppedEvent implements ISessionEvent {
  readonly type: EventType
  readonly reactions: ISessionReactions
  readonly timestamp: number

  constructor(timestamp: number, reactions: ISessionReactions) {
    this.type = EventType.VideoStopped
    this.reactions = reactions
    this.timestamp = timestamp
  }
}
