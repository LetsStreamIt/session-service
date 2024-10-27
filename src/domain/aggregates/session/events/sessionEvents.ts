import { ISessionEvent, EventType } from '../../../common/event/event'
import { ISessionReactions } from '../../../common/reactions/sessionReactions'
import { User } from '../../../common/user'

/**
 * Session Created Event
 */
export class SessionCreatedEvent implements ISessionEvent {
  private readonly type: EventType
  private readonly sessionReactions: ISessionReactions
  private readonly sessionName: string

  constructor(sessionName: string, sessionReactions: ISessionReactions) {
    this.type = EventType.SessionCreated
    this.sessionName = sessionName
    this.sessionReactions = sessionReactions
  }

  get getSessionName(): string {
    return this.sessionName
  }

  get getType(): EventType {
    return this.type
  }

  get getSessionReactions(): ISessionReactions {
    return this.sessionReactions
  }
}

/**
 * User Joined Session Event
 */
export class UserJoinedSessionEvent implements ISessionEvent {
  private readonly type: EventType
  private readonly sessionReactions: ISessionReactions
  private readonly user: User

  constructor(user: User, sessionReactions: ISessionReactions) {
    this.type = EventType.UserJoinedSession
    this.sessionReactions = sessionReactions
    this.user = user
  }

  get getUser(): User {
    return this.user
  }

  get getType(): EventType {
    return this.type
  }

  get getSessionReactions(): ISessionReactions {
    return this.sessionReactions
  }
}

/**
 * User Left Session Event
 */
export class UserLeftSessionEvent implements ISessionEvent {
  private readonly type: EventType
  private readonly sessionReactions: ISessionReactions
  private readonly user: User

  constructor(user: User, sessionReactions: ISessionReactions) {
    this.type = EventType.UserLeftSession
    this.sessionReactions = sessionReactions
    this.user = user
  }

  get getUser(): User {
    return this.user
  }

  get getType(): EventType {
    return this.type
  }

  get getSessionReactions(): ISessionReactions {
    return this.sessionReactions
  }
}
