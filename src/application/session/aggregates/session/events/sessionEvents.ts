import { SessionEvent, EventType } from '../../../../../domain/event/event'
import { SessionReactions } from '../../../../../domain/reactions/sessionReactions'
import { User } from '../../../user'

export class SessionCreatedEvent implements SessionEvent {
  type: EventType
  sessionReactions: SessionReactions
  sessionName: string

  constructor(sessionName: string, sessionReactions: SessionReactions) {
    this.type = EventType.SessionCreated
    this.sessionName = sessionName
    this.sessionReactions = sessionReactions
  }
}

export class UserJoinedEvent implements SessionEvent {
  type: EventType
  sessionReactions: SessionReactions
  user: User

  constructor(user: User, sessionReactions: SessionReactions) {
    this.type = EventType.UserJoinedSession
    this.sessionReactions = sessionReactions
    this.user = user
  }
}

export class UserLeftSessionEvent implements SessionEvent {
  type: EventType
  sessionReactions: SessionReactions
  user: User

  constructor(user: User, sessionReactions: SessionReactions) {
    this.type = EventType.UserLeftSession
    this.sessionReactions = sessionReactions
    this.user = user
  }
}
