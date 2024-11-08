import { Pair, Entity, Repository } from '../../common/entity'
import { IEventBus, EventBus } from '../../common/event/eventBus'
import { IChat, Chat } from '../chat/chat'
import { User, UserRepository } from '../../common/user'
import { EventType } from '../../common/event/event'
import { IVideo, Video } from '../video/video'
import { UserJoinedSessionEvent, UserLeftSessionEvent } from './events/sessionEvents'

/**
 * Session Id
 */
export class SessionId {
  sessionName: string

  constructor(sessionName: string) {
    this.sessionName = sessionName
  }
}

export class SessionEntry extends Pair<UserRepository, Pair<IChat, IVideo>> {}

export class Session extends Entity<SessionId, SessionEntry> {
  private readonly bus: IEventBus

  constructor(id: SessionId, videoRef: string) {
    const eventBus = new EventBus()
    const sessionEntry = new SessionEntry(
      new UserRepository(),
      new Pair(new Chat(eventBus), new Video(videoRef, eventBus))
    )
    super(id, sessionEntry)
    this.bus = eventBus
  }

  get users(): UserRepository {
    return this.entityValue.getX
  }

  get eventBus(): IEventBus {
    return this.bus
  }

  get chat(): IChat {
    return this.entityValue.getY.getX
  }

  get video(): IVideo {
    return this.entityValue.getY.getY
  }

  registerEventHandlers() {
    this.entityValue?.getY.getX.registerEventHandlers()
    this.entityValue?.getY.getY.registerEventHandlers()
    this.eventBus.subscribe(EventType.UserJoinedSession, this.handleUserJoinedEvent)
    this.eventBus.subscribe(EventType.UserLeftSession, this.handleUserLeftEvent)
  }

  isUserJoined(user: User): boolean {
    const users = this.entityValue?.getX
    if (users) {
      return users.contains(user.id)
    }
    return false
  }

  /**
   * User Joined Session Event Handler.
   * - Adds the User to the list of connected Users inside the Session
   * - Triggers respective reaction specified by the inteface layer
   * @param event User Joined Session Event
   * @returns Promise resolved whenever reaction is triggered.
   */
  private handleUserJoinedEvent: (event: UserJoinedSessionEvent) => Promise<void> = (
    event: UserJoinedSessionEvent
  ) => {
    return new Promise((resolve) => {
      this.entityValue?.getX.add(event.user)
      event.reactions.joinUserToSession()
      resolve()
    })
  }

  /**
   * User Left Session Event Handler.
   * - Removes the User from the list of connected Users of the Session
   * - Triggers respective reaction specified by the inteface layer
   * @param event User Left Session Event
   * @returns Promise resolved whenever reaction is triggered.
   */
  private handleUserLeftEvent: (event: UserLeftSessionEvent) => Promise<void> = (
    event: UserLeftSessionEvent
  ) => {
    return new Promise((resolve) => {
      this.entityValue?.getX.remove(event.user.id)
      event.reactions.leaveUserFromSessionAndDisconnect()
      resolve()
    })
  }
}

export class SessionRepository extends Repository<Session, SessionId, SessionEntry> {}
