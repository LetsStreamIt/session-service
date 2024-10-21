import { SessionEvent, EventType } from '../../../event/event'
import { SessionReactions } from '../../../reactions/sessionReactions'

export class VideoPlayedEvent implements SessionEvent {
  type: EventType
  sessionReactions: SessionReactions
  timestamp: number

  constructor(timestamp: number, sessionReactions: SessionReactions) {
    this.type = EventType.VideoPlayed
    this.sessionReactions = sessionReactions
    this.timestamp = timestamp
  }
}

export class VideoStoppedEvent implements SessionEvent {
  type: EventType
  sessionReactions: SessionReactions
  timestamp: number

  constructor(timestamp: number, sessionReactions: SessionReactions) {
    this.type = EventType.VideoStopped
    this.sessionReactions = sessionReactions
    this.timestamp = timestamp
  }
}
