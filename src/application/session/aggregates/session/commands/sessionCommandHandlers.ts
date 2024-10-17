import { getUserFromToken, isYoutubeVideoIdValid, sessionNameFromTokenAndVideoId } from './utils'
import { TextMessage } from '../../../message'
import { User } from '../../../user'
import { SendMessageCommand } from '../../chat/commands/chatCommands'
import { MessageSentEvent } from '../../chat/events/chatEvents'
import { PlayVideoCommand, StopVideoCommand } from '../../video/commands/videoCommands'
import { VideoPlayedEvent, VideoStoppedEvent } from '../../video/events/videoEvents'
import { UserJoinedEvent, UserLeftSessionEvent } from '../events/sessionEvents'
import { SessionRepository, SessionId, SessionImpl, SessionEntry, Session } from '../session'
import { CreateSessionCommand, JoinSessionCommand, LeaveSessionCommand } from './sessionCommands'
import {
  CreateSessionResponse,
  JoinSessionResponse,
  JoinSessionResponseContent,
  JoinSessionResponseType,
  LeaveSessionResponse,
  PlayVideoResponse,
  ResponseStatus,
  SendMessageResponse,
  StopVideoResponse
} from '../../../../../presentation/commands/ack/ack'
import { EventBus } from '../../../../event/eventBus'
import { EventType } from '../../../../event/event'

export class SessionCommandHandlers {
  sessions: SessionRepository

  constructor() {
    this.sessions = new SessionRepository()
  }

  private registerEventHandlers(eventBus: EventBus, sessionId: SessionId) {
    eventBus.subscribe(EventType.UserLeftSession, () => {
      return new Promise((resolve) => {
        this.deleteSessionWhenAllUserLeft(sessionId)
        resolve()
      })
    })
  }

  async handleCreateSessionCommand(command: CreateSessionCommand): Promise<CreateSessionResponse> {
    return new Promise((resolve) => {
      if (isYoutubeVideoIdValid(command.videoId)) {
        const sessionName: string = sessionNameFromTokenAndVideoId(command.token, command.videoId)
        const sessionId: SessionId = new SessionId(sessionName)
        const session: Session = new SessionImpl(sessionId, command.videoId)
        this.sessions.add(session)
        session.registerEventHandlers()
        this.registerEventHandlers(session.eventBus(), sessionId)

        const timeout = 5_000
        this.deleteSessionAtTimeout(sessionId, timeout)

        resolve(new CreateSessionResponse(ResponseStatus.SUCCESS, sessionName))
      } else {
        resolve(new CreateSessionResponse(ResponseStatus.FAILURE, ''))
      }
    })
  }

  async handleJoinUserCommand(command: JoinSessionCommand): Promise<JoinSessionResponse> {
    return new Promise((resolve) => {
      if (!this.isUserJoined(command.token)) {
        const user: User = getUserFromToken(command.token)
        const sessionId: SessionId = new SessionId(command.sessionName)
        const session: Session | undefined = this.sessions.find(sessionId)

        // Resolve the Promise if the session is already existing, reject otherwise
        if (session) {
          const videoId = session.value?.getY.getY.getVideoRef
          if (videoId) {
            session.eventBus().publish(new UserJoinedEvent(user, command.notifications))
            resolve(
              new JoinSessionResponse(
                new JoinSessionResponseContent(JoinSessionResponseType.SUCCESS, videoId)
              )
            )
          }
        } else {
          resolve(
            new JoinSessionResponse(
              new JoinSessionResponseContent(JoinSessionResponseType.SESSION_NOT_FOUND, '')
            )
          )
        }
      } else {
        resolve(
          new JoinSessionResponse(
            new JoinSessionResponseContent(JoinSessionResponseType.USER_ALREADY_JOINED, '')
          )
        )
      }
    })
  }

  async handleLeaveUserCommand(command: LeaveSessionCommand): Promise<LeaveSessionResponse> {
    return new Promise((resolve) => {
      const sessionId: SessionId = new SessionId(command.sessionName)
      const user: User = getUserFromToken(command.token)
      const session: Session | undefined = this.sessions.find(sessionId)

      if (session) {
        session.eventBus().publish(new UserLeftSessionEvent(user, command.notifications))
        resolve(new LeaveSessionResponse(ResponseStatus.SUCCESS))
      } else {
        resolve(new LeaveSessionResponse(ResponseStatus.FAILURE))
      }
    })
  }

  async handleSendMessageCommand(command: SendMessageCommand): Promise<SendMessageResponse> {
    return new Promise((resolve) => {
      if (command.message !== '') {
        const user: User = getUserFromToken(command.token)
        const session: Session | undefined = this.sessions.find(new SessionId(command.sessionName))
        const textMessage: TextMessage = new TextMessage(user, command.message)
        if (session) {
          session.eventBus().publish(new MessageSentEvent(textMessage, command.notifications))
        }
        resolve(new SendMessageResponse(ResponseStatus.SUCCESS))
      } else {
        resolve(new SendMessageResponse(ResponseStatus.FAILURE))
      }
    })
  }

  async handlePlayVideoCommand(command: PlayVideoCommand): Promise<PlayVideoResponse> {
    return new Promise((resolve) => {
      const session: Session | undefined = this.sessions.find(new SessionId(command.sessionName))
      if (session) {
        session.eventBus().publish(new VideoPlayedEvent(command.timestamp, command.notifications))
        resolve(new PlayVideoResponse(ResponseStatus.SUCCESS))
      } else {
        resolve(new PlayVideoResponse(ResponseStatus.FAILURE))
      }
    })
  }

  async handleStopVideoCommand(command: StopVideoCommand): Promise<StopVideoResponse> {
    return new Promise((resolve) => {
      const session: Session | undefined = this.sessions.find(new SessionId(command.sessionName))
      if (session) {
        session.eventBus().publish(new VideoStoppedEvent(command.timestamp, command.notifications))
        resolve(new StopVideoResponse(ResponseStatus.SUCCESS))
      } else {
        resolve(new StopVideoResponse(ResponseStatus.FAILURE))
      }
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

  private deleteSessionWhenAllUserLeft(sessionId: SessionId): void {
    const sessionEntry: SessionEntry | undefined = this.sessions.find(sessionId)?.value
    if (sessionEntry) {
      if (sessionEntry.getX.getValues.length == 0) {
        this.sessions.remove(sessionId)
      }
    }
  }
}
