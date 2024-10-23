import { ISessionEvent, EventType } from '../../../event/event'
import { ISessionReactions } from '../../../reactions/sessionReactions'

/**
 * Video Played Event
 */
export class VideoPlayedEvent implements ISessionEvent {
  private readonly type: EventType
  private readonly sessionReactions: ISessionReactions
  private readonly timestamp: number

  constructor(timestamp: number, sessionReactions: ISessionReactions) {
    this.type = EventType.VideoPlayed
    this.sessionReactions = sessionReactions
    this.timestamp = timestamp
  }

  get getTimestamp(): number {
    return this.timestamp
  }

  get getType(): EventType {
    return this.type
  }

  get getSessionReactions(): ISessionReactions {
    return this.sessionReactions
  }
}

/**
 * Video Stopped Event
 */
export class VideoStoppedEvent implements ISessionEvent {
  private readonly type: EventType
  private readonly sessionReactions: ISessionReactions
  private readonly timestamp: number

  constructor(timestamp: number, sessionReactions: ISessionReactions) {
    this.type = EventType.VideoStopped
    this.sessionReactions = sessionReactions
    this.timestamp = timestamp
  }

  get getTimestamp(): number {
    return this.timestamp
  }

  get getType(): EventType {
    return this.type
  }

  get getSessionReactions(): ISessionReactions {
    return this.sessionReactions
  }
}
