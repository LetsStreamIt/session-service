import { ISessionEvent, EventType } from '../../../event/event'
import { ISessionReactions } from '../../../reactions/sessionReactions'
import { User } from '../../../user'

/**
 * Session Created Event
 */
export class SessionCreatedEvent implements ISessionEvent {
  type: EventType
  sessionReactions: ISessionReactions
  sessionName: string

  constructor(sessionName: string, sessionReactions: ISessionReactions) {
    this.type = EventType.SessionCreated
    this.sessionName = sessionName
    this.sessionReactions = sessionReactions
  }
}

/**
 * User Joined Session Event
 */
export class UserJoinedSessionEvent implements ISessionEvent {
  type: EventType
  sessionReactions: ISessionReactions
  user: User

  constructor(user: User, sessionReactions: ISessionReactions) {
    this.type = EventType.UserJoinedSession
    this.sessionReactions = sessionReactions
    this.user = user
  }
}

/**
 * User Left Session Event
 */
export class UserLeftSessionEvent implements ISessionEvent {
  type: EventType
  sessionReactions: ISessionReactions
  user: User

  constructor(user: User, sessionReactions: ISessionReactions) {
    this.type = EventType.UserLeftSession
    this.sessionReactions = sessionReactions
    this.user = user
  }
}
