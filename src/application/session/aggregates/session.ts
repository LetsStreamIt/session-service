import { Pair, Entity, Repository } from '../entity'
import { EventBus, EventBusImpl } from '../events/eventBus'
import { EventType, UserJoinedEvent, UserLeftSessionEvent } from '../events/events'
import { Chat, ChatImpl } from './chat'
import { User, UserRepository } from './user'
import { Video, VideoImpl } from './video'

export class SessionId {
  sessionName: string

  constructor(sessionName: string) {
    this.sessionName = sessionName
  }
}

export class SessionEntry extends Pair<UserRepository, Pair<Chat, Video>> {}

export interface Session extends Entity<SessionId, SessionEntry> {
  registerEventHandlers(): void
  isUserJoined(user: User): boolean
  eventBus(): EventBus
}

export class SessionImpl implements Session {
  id: SessionId
  value?: SessionEntry | undefined
  sessionEventBus: EventBus

  constructor(id: SessionId) {
    this.id = id
    this.sessionEventBus = new EventBusImpl()
    this.value = new SessionEntry(
      new UserRepository(),
      new Pair(new ChatImpl(this.sessionEventBus), new VideoImpl(this.sessionEventBus))
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

  eventBus(): EventBus {
    return this.sessionEventBus
  }

  private handleUserJoinedEvent: (event: UserJoinedEvent) => Promise<void> = (
    event: UserJoinedEvent
  ) => {
    return new Promise(() => {
      this.value?.getX.add(event.user)
      event.notifications.joinUserToRoom()
    })
  }

  private handleUserLeftEvent: (event: UserLeftSessionEvent) => Promise<void> = (
    event: UserLeftSessionEvent
  ) => {
    return new Promise(() => {
      event.notifications.leaveUserFromRoomAndDisconnect()
      this.value?.getX.remove(event.user.id)
    })
  }
}

export class RoomRepository extends Repository<Session> {}
