import { ISessionEvent, EventType } from '../../../event/event'
import { ISessionReactions } from '../../../reactions/sessionReactions'

/**
 * Video Played Event
 */
export class VideoPlayedEvent implements ISessionEvent {
  type: EventType
  sessionReactions: ISessionReactions
  timestamp: number

  constructor(timestamp: number, sessionReactions: ISessionReactions) {
    this.type = EventType.VideoPlayed
    this.sessionReactions = sessionReactions
    this.timestamp = timestamp
  }
}

/**
 * Video Stopped Event
 */
export class VideoStoppedEvent implements ISessionEvent {
  type: EventType
  sessionReactions: ISessionReactions
  timestamp: number

  constructor(timestamp: number, sessionReactions: ISessionReactions) {
    this.type = EventType.VideoStopped
    this.sessionReactions = sessionReactions
    this.timestamp = timestamp
  }
}
