import { CreateSessionCommand } from '../../domain/aggregates/session/commands/sessionCommands'
import {
  sessionNameFromTokenAndVideoId as sessionNameFromEmailAndVideoId,
  youtubeVideoIdFromUrl
} from './utils'
import { SessionId, Session, SessionRepository } from '../../domain/aggregates/session/session'
import { CreateSessionResponse, ResponseStatus } from '../../domain/common/command/response'
import { EventType } from '../../domain/common/event/event'
import { IEventBus } from '../../domain/common/event/eventBus'

/**
 * Create Session Command Handler.
 * Creates a session if the provided URL is a valid Youtube Video URL. The session is automatically
 * deleted if no user joins it in timeout seconds (5 seconds).
 * @param sessions Session repository
 * @param command Create Session command
 * @returns A Create Session Response to send back to the client if the session is successfully created
 */
export async function handleCreateSessionCommand(
  sessions: SessionRepository,
  command: CreateSessionCommand
): Promise<CreateSessionResponse> {
  return new Promise((resolve) => {
    youtubeVideoIdFromUrl(command.content.videoUrl).then((videoId: string | undefined) => {
      if (videoId) {
        const sessionName: string = sessionNameFromEmailAndVideoId(
          command.content.user.getId.getEmail,
          videoId
        )
        const sessionId: SessionId = new SessionId(sessionName)
        const session: Session = new Session(sessionId, videoId)
        sessions.add(session)
        session.registerEventHandlers()
        subscribeToUserLeftSessionEvents(sessions, session.eventBus, sessionId)

        const timeout = 5_000
        deleteSessionAtTimeout(sessions, sessionId, timeout)

        resolve(new CreateSessionResponse(ResponseStatus.SUCCESS, sessionName))
      } else {
        resolve(new CreateSessionResponse(ResponseStatus.FAILURE, ''))
      }
    })
  })
}

/**
 * Deletes the Session specified as parameter from the Session Repository if no user is joined after timeout seconds.
 * @param sessions Session Repository
 * @param sessionId Session Id
 * @param timeout Timeout
 */
function deleteSessionAtTimeout(
  sessions: SessionRepository,
  sessionId: SessionId,
  timeout: number
) {
  setTimeout(() => deleteSessionWhenAllUserLeft(sessions, sessionId), timeout)
}

/**
 * Subscribe to UserLeftSession events, deleting the Session when all user leave.
 * @param sessions Session Repository
 * @param eventBus Event bus
 * @param sessionId Session Id of the Session to remove
 */
function subscribeToUserLeftSessionEvents(
  sessions: SessionRepository,
  eventBus: IEventBus,
  sessionId: SessionId
) {
  eventBus.subscribe(EventType.UserLeftSession, () => {
    return new Promise((resolve) => {
      deleteSessionWhenAllUserLeft(sessions, sessionId)
      resolve()
    })
  })
}

/**
 * Delete the Session with SessioId specified as parameter when no user is joined
 * @param sessions Session Repository
 * @param sessionId SessioId of the Session to remove
 */
function deleteSessionWhenAllUserLeft(sessions: SessionRepository, sessionId: SessionId): void {
  const session: Session | undefined = sessions.find(sessionId)
  if (session) {
    if (session.users.getValues.length == 0) {
      sessions.remove(sessionId)
    }
  }
}
