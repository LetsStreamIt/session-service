import { getUserFromToken, isYoutubeVideoIdValid, sessionNameFromTokenAndVideoId } from './utils'
import { TextMessage } from '../../../message'
import { User } from '../../../user'
import { SendMessageCommand } from '../../chat/commands/chatCommands'
import { MessageSentEvent } from '../../chat/events/chatEvents'
import { PlayVideoCommand, StopVideoCommand } from '../../video/commands/videoCommands'
import { VideoPlayedEvent, VideoStoppedEvent } from '../../video/events/videoEvents'
import { UserJoinedEvent, UserLeftSessionEvent } from '../events/sessionEvents'
import { RoomRepository, SessionId, SessionImpl, SessionEntry, Session } from '../session'
import { CreateSessionCommand, JoinSessionCommand, LeaveSessionCommand } from './sessionCommands'

export class SessionCommandHandlers {
  sessions: RoomRepository

  constructor() {
    this.sessions = new RoomRepository()
  }

  async handleCreateRoomCommand(command: CreateSessionCommand): Promise<string> {
    return new Promise((resolve, reject) => {
      if (isYoutubeVideoIdValid(command.videoId)) {
        const sessionName: string = sessionNameFromTokenAndVideoId(command.token, command.videoId)
        const sessionId: SessionId = new SessionId(sessionName)
        const session: Session = new SessionImpl(sessionId)
        this.sessions.add(session)
        session.registerEventHandlers()

        const timeout = 5_000
        this.deleteSessionAtTimeout(sessionId, timeout)

        resolve(sessionName)
      } else {
        reject()
      }
    })
  }

  async handleJoinUserCommand(command: JoinSessionCommand): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isUserJoined(command.token)) {
        const user: User = getUserFromToken(command.token)
        const sessionId: SessionId = new SessionId(command.sessionName)
        const session: Session | undefined = this.sessions.find(sessionId)

        // Resolve the Promise if the session is already existing, reject otherwise
        if (session) {
          session.eventBus().publish(new UserJoinedEvent(user, command.notifications))
          resolve()
        } else {
          reject()
        }
      } else {
        reject()
      }
    })
  }

  async handleLeaveUserCommand(command: LeaveSessionCommand): Promise<void> {
    return new Promise((resolve) => {
      const sessionId: SessionId = new SessionId(command.sessionName)
      const user: User = getUserFromToken(command.token)
      const session: Session | undefined = this.sessions.find(sessionId)

      if (session) {
        session.eventBus().publish(new UserLeftSessionEvent(user, command.notifications))
        this.removeRoomWhenAllUserLeft(sessionId)
      }
      resolve()
    })
  }

  async handleSendMessageCommand(command: SendMessageCommand): Promise<void> {
    return new Promise((resolve, reject) => {
      if (command.message !== '') {
        const user: User = getUserFromToken(command.token)
        const session: Session | undefined = this.sessions.find(new SessionId(command.sessionName))
        const textMessage: TextMessage = new TextMessage(user, command.message)
        if (session) {
          session.eventBus().publish(new MessageSentEvent(textMessage, command.notifications))
        }
        resolve()
      } else {
        reject()
      }
    })
  }

  async handlePlayVideoCommand(command: PlayVideoCommand): Promise<void> {
    return new Promise((resolve) => {
      const session: Session | undefined = this.sessions.find(new SessionId(command.sessionName))
      if (session) {
        session.eventBus().publish(new VideoPlayedEvent(command.timestamp, command.notifications))
      }
      resolve()
    })
  }

  async handleStopVideoCommand(command: StopVideoCommand): Promise<void> {
    return new Promise((resolve) => {
      const session: Session | undefined = this.sessions.find(new SessionId(command.sessionName))
      if (session) {
        session.eventBus().publish(new VideoStoppedEvent(command.timestamp, command.notifications))
      }
      resolve()
    })
  }

  private isUserJoined(token: string): boolean {
    return this.sessions.getValues.some((session) => session.isUserJoined(getUserFromToken(token)))
  }

  private deleteSessionAtTimeout(sessionId: SessionId, timeout: number) {
    setTimeout(() => {
      const session: Session | undefined = this.sessions.find(sessionId)
      if (session) {
        if (session.value?.getX.getValues.length == 0) {
          this.sessions.remove(sessionId)
        }
      }
    }, timeout)
  }

  private removeRoomWhenAllUserLeft(sessionId: SessionId): void {
    const sessionEntry: SessionEntry | undefined = this.sessions.find(sessionId)?.value
    if (sessionEntry) {
      if (sessionEntry.getX.getValues.length == 0) {
        this.sessions.remove(sessionId)
      }
    }
  }
}
