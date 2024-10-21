import { ISessionEvent, EventType } from '../../../event/event'
import { ISessionReactions } from '../../../reactions/sessionReactions'

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
