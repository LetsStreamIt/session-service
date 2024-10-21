import { Pair, Entity, Repository } from '../../entity'
import { EventBus, EventBusImpl } from '../../event/eventBus'
import { Chat, ChatImpl } from '../chat/chat'
import { User, UserRepository } from '../../user'
import { EventType } from '../../event/event'
import { Video, VideoImpl } from '../video/video'
import { UserJoinedEvent, UserLeftSessionEvent } from './events/sessionEvents'

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

  constructor(id: SessionId, videoRef: string) {
    this.id = id
    this.sessionEventBus = new EventBusImpl()
    this.value = new SessionEntry(
      new UserRepository(),
      new Pair(new ChatImpl(this.sessionEventBus), new VideoImpl(videoRef, this.sessionEventBus))
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

export class SessionRepository extends Repository<Session> {}
