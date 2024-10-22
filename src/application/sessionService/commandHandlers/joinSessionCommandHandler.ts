import { JoinSessionCommand } from '../../../domain/aggregates/session/commands/sessionCommands'
import { UserJoinedSessionEvent } from '../../../domain/aggregates/session/events/sessionEvents'
import { SessionRepository, SessionId, ISession } from '../../../domain/aggregates/session/session'
import {
  JoinSessionResponse,
  JoinSessionResponseContent,
  JoinSessionResponseType
} from '../../../domain/command/response'
import { User } from '../../../domain/user'

/**
 * Checks if user is joined.
 * @param sessions Session repository
 * @param user User
 * @returns true if joined, false otherwise
 */
function isUserJoined(sessions: SessionRepository, user: User): boolean {
  return sessions.getValues.some((session) => session.isUserJoined(user))
}

/**
 * Join Session Command Handler.
 * Joins a user to the specified Session, if existing.
 * @param sessions Session Repository
 * @param command Join command
 * @returns A Join Session Response to send back to the client specifying if the command is successfully executed,
 * if the Session with the specified name is not found or the user is already joined to another Session.
 */
export async function handleJoinSessionCommand(
  sessions: SessionRepository,
  command: JoinSessionCommand
): Promise<JoinSessionResponse> {
  return new Promise((resolve) => {
    if (!isUserJoined(sessions, command.user)) {
      const sessionId: SessionId = new SessionId(command.sessionName)
      const session: ISession | undefined = sessions.find(sessionId)

      // Resolve the Promise if the session is already existing, reject otherwise
      if (session) {
        const videoId = session.value?.getY.getY.getVideoId
        if (videoId) {
          session.eventBus.publish(
            new UserJoinedSessionEvent(command.user, command.sessionReactions)
          )
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
