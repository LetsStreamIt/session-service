import { ISessionEvent, EventType } from '../../../common/event/event'
import { ISessionReactions } from '../../../common/reactions/sessionReactions'
import { User } from '../../../common/user'

/**
 * Session Created Event
 */
export class SessionCreatedEvent implements ISessionEvent {
  readonly type: EventType
  readonly reactions: ISessionReactions
  readonly sessionName: string

  constructor(sessionName: string, reactions: ISessionReactions) {
    this.type = EventType.SessionCreated
    this.sessionName = sessionName
    this.reactions = reactions
  }
}

/**
 * User Joined Session Event
 */
export class UserJoinedSessionEvent implements ISessionEvent {
  readonly type: EventType
  readonly reactions: ISessionReactions
  readonly user: User

  constructor(user: User, reactions: ISessionReactions) {
    this.type = EventType.UserJoinedSession
    this.reactions = reactions
    this.user = user
  }
}

/**
 * User Left Session Event
 */
export class UserLeftSessionEvent implements ISessionEvent {
  readonly type: EventType
  readonly reactions: ISessionReactions
  readonly user: User

  constructor(user: User, reactions: ISessionReactions) {
    this.type = EventType.UserLeftSession
    this.reactions = reactions
    this.user = user
  }
}
