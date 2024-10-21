import { Pair, Entity, Repository } from '../../entity'
import { IEventBus, EventBus } from '../../event/eventBus'
import { IChat, Chat } from '../chat/chat'
import { User, UserRepository } from '../../user'
import { EventType } from '../../event/event'
import { IVideo, Video } from '../video/video'
import { UserJoinedEvent, UserLeftSessionEvent } from './events/sessionEvents'

export class SessionId {
  sessionName: string

  constructor(sessionName: string) {
    this.sessionName = sessionName
  }
}

export class SessionEntry extends Pair<UserRepository, Pair<IChat, IVideo>> {}

export interface ISession extends Entity<SessionId, SessionEntry> {
  registerEventHandlers(): void
  isUserJoined(user: User): boolean
  eventBus(): IEventBus
}

export class Session implements ISession {
  id: SessionId
  value?: SessionEntry | undefined
  sessionEventBus: IEventBus

  constructor(id: SessionId, videoRef: string) {
    this.id = id
    this.sessionEventBus = new EventBus()
    this.value = new SessionEntry(
      new UserRepository(),
      new Pair(new Chat(this.sessionEventBus), new Video(videoRef, this.sessionEventBus))
    )
  }

  registerEventHandlers() {
    this.value?.getY.getX.registerEventHandlers()
    this.value?.getY.getY.registerEventHandlers()
    this.sessionEventBus.subscribe(EventType.UserJoinedSession, this.handleUserJoinedEvent)
    this.sessionEventBus.subscribe(EventType.UserLeftSession, this.handleUserLeftEvent)
  }

  isUserJoined(user: User): boolean {
    const users = this.value?.getX
    if (users) {
      return users.contains(user.id)
    }
    return false
  }

  eventBus(): IEventBus {
    return this.sessionEventBus
  }

  private handleUserJoinedEvent: (event: UserJoinedEvent) => Promise<void> = (
    event: UserJoinedEvent
  ) => {
    return new Promise((resolve) => {
      this.value?.getX.add(event.user)
      event.sessionReactions.joinUserToSession()
      resolve()
    })
  }

  private handleUserLeftEvent: (event: UserLeftSessionEvent) => Promise<void> = (
    event: UserLeftSessionEvent
  ) => {
    return new Promise((resolve) => {
      event.sessionReactions.leaveUserFromSessionAndDisconnect()
      this.value?.getX.remove(event.user.id)
      resolve()
    })
  }
}

export class SessionRepository extends Repository<ISession> {}
