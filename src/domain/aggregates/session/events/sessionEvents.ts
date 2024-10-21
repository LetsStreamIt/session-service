import { ISessionEvent, EventType } from '../../../event/event'
import { ISessionReactions } from '../../../reactions/sessionReactions'
import { User } from '../../../user'

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

export class UserJoinedEvent implements ISessionEvent {
  type: EventType
  sessionReactions: ISessionReactions
  user: User

  constructor(user: User, sessionReactions: ISessionReactions) {
    this.type = EventType.UserJoinedSession
    this.sessionReactions = sessionReactions
    this.user = user
  }
}

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
