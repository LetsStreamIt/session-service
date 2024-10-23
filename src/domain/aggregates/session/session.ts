import { Pair, Entity, Repository } from '../../entity'
import { IEventBus, EventBus } from '../../event/eventBus'
import { IChat, Chat } from '../chat/chat'
import { User, UserRepository } from '../../user'
import { EventType } from '../../event/event'
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

// export interface ISession extends Entity<SessionId, SessionEntry> {
//   /**
//    * Register Event Handlers for Events Emitted by the Session Service
//    */
//   registerEventHandlers(): void

//   /**
//    * Checks if the specified User is Joined to the Session
//    * @param user
//    */
//   isUserJoined(user: User): boolean

//   /**
//    * Retreives the Event Bus
//    */
//   get getEventBus(): IEventBus

//   get getChat(): IChat

//   get getVideo(): IVideo

// }

export class Session extends Entity<SessionId, SessionEntry> {
  private readonly eventBus: IEventBus

  constructor(id: SessionId, videoRef: string) {
    const eventBus = new EventBus()
    const sessionEntry = new SessionEntry(
      new UserRepository(),
      new Pair(new Chat(eventBus), new Video(videoRef, eventBus))
    )
    super(id, sessionEntry)
    this.eventBus = eventBus
  }

  get getId(): SessionId {
    throw new Error('Method not implemented.')
  }

  get getUsers(): UserRepository {
    return this.value.getX
  }

  get getEventBus(): IEventBus {
    return this.eventBus
  }

  get getChat(): IChat {
    return this.value.getY.getX
  }

  get getVideo(): IVideo {
    return this.value.getY.getY
  }

  registerEventHandlers() {
    this.value?.getY.getX.registerEventHandlers()
    this.value?.getY.getY.registerEventHandlers()
    this.eventBus.subscribe(EventType.UserJoinedSession, this.handleUserJoinedEvent)
    this.eventBus.subscribe(EventType.UserLeftSession, this.handleUserLeftEvent)
  }

  isUserJoined(user: User): boolean {
    const users = this.value?.getX
    if (users) {
      return users.contains(user.getId)
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
      this.value?.getX.add(event.getUser)
      event.getSessionReactions.joinUserToSession()
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
      this.value?.getX.remove(event.getUser.getId)
      event.getSessionReactions.leaveUserFromSessionAndDisconnect()
      resolve()
    })
  }
}

export class SessionRepository extends Repository<Session, SessionId, SessionEntry> {}
