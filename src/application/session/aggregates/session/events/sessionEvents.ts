import { SessionNotifications } from '../../../../../presentation/notifications/sessionNotifications'
import { SessionEvent, EventType } from '../../../../event/event'
import { User } from '../../../user'

export class SessionCreatedEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  sessionName: string

  constructor(sessionName: string, notifications: SessionNotifications) {
    this.type = EventType.SessionCreated
    this.sessionName = sessionName
    this.notifications = notifications
  }
}

export class UserJoinedEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  user: User

  constructor(user: User, notifications: SessionNotifications) {
    this.type = EventType.UserJoinedSession
    this.notifications = notifications
    this.user = user
  }
}

export class UserLeftSessionEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  user: User

  constructor(user: User, notifications: SessionNotifications) {
    this.type = EventType.UserLeftSession
    this.notifications = notifications
    this.user = user
  }
}
