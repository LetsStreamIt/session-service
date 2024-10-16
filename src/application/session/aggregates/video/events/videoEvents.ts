import { SessionNotifications } from '../../../../../presentation/notifications/sessionNotifications'
import { SessionEvent, EventType } from '../../../../event/event'

export class VideoPlayedEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  timestamp: number

  constructor(timestamp: number, notifications: SessionNotifications) {
    this.type = EventType.VideoPlayed
    this.notifications = notifications
    this.timestamp = timestamp
  }
}

export class VideoStoppedEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  timestamp: number

  constructor(timestamp: number, notifications: SessionNotifications) {
    this.type = EventType.VideoStopped
    this.notifications = notifications
    this.timestamp = timestamp
  }
}
