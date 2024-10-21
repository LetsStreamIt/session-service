import { CreateSessionCommand } from '../../../domain/aggregates/session/commands/sessionCommands'
import {
  sessionNameFromTokenAndVideoId,
  youtubeVideoIdFromUrl
} from '../../../domain/aggregates/session/commands/utils'
import {
  Session,
  SessionEntry,
  SessionId,
  SessionImpl,
  SessionRepository
} from '../../../domain/aggregates/session/session'
import { CreateSessionResponse, ResponseStatus } from '../../../domain/command/response'
import { EventType } from '../../../domain/event/event'
import { EventBus } from '../../../domain/event/eventBus'

export async function handleCreateSessionCommand(
  sessions: SessionRepository,
  command: CreateSessionCommand
): Promise<CreateSessionResponse> {
  return new Promise((resolve) => {
    youtubeVideoIdFromUrl(command.videoUrl).then((videoId: string | undefined) => {
      if (videoId) {
        const sessionName: string = sessionNameFromTokenAndVideoId(command.token, videoId)
        const sessionId: SessionId = new SessionId(sessionName)
        const session: Session = new SessionImpl(sessionId, videoId)
        sessions.add(session)
        session.registerEventHandlers()
        registerEventHandlers(sessions, session.eventBus(), sessionId)

        const timeout = 5_000
        deleteSessionAtTimeout(sessions, sessionId, timeout)

        resolve(new CreateSessionResponse(ResponseStatus.SUCCESS, sessionName))
      } else {
        resolve(new CreateSessionResponse(ResponseStatus.FAILURE, ''))
      }
    })
  })
}

function deleteSessionAtTimeout(
  sessions: SessionRepository,
  sessionId: SessionId,
  timeout: number
) {
  setTimeout(() => {
    const session: Session | undefined = sessions.find(sessionId)
    if (session) {
      if (session.value?.getX.getValues.length == 0) {
        sessions.remove(sessionId)
      }
    }
  }, timeout)
}

function registerEventHandlers(
  sessions: SessionRepository,
  eventBus: EventBus,
  sessionId: SessionId
) {
  eventBus.subscribe(EventType.UserLeftSession, () => {
    return new Promise((resolve) => {
      deleteSessionWhenAllUserLeft(sessions, sessionId)
      resolve()
    })
  })
}

function deleteSessionWhenAllUserLeft(sessions: SessionRepository, sessionId: SessionId): void {
  const sessionEntry: SessionEntry | undefined = sessions.find(sessionId)?.value
  if (sessionEntry) {
    if (sessionEntry.getX.getValues.length == 0) {
      sessions.remove(sessionId)
    }
  }
}
