import { JoinSessionCommand } from '../../domain/aggregates/session/commands/sessionCommands'
import { UserJoinedSessionEvent } from '../../domain/aggregates/session/events/sessionEvents'
import { SessionRepository, SessionId, Session } from '../../domain/aggregates/session/session'
import {
  JoinSessionResponse,
  JoinSessionResponseContent,
  JoinSessionResponseStatus
} from '../../domain/common/command/response'
import { User } from '../../domain/common/user'

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
    if (!isUserJoined(sessions, command.content.user)) {
      const sessionId: SessionId = new SessionId(command.content.sessionName)
      const session: Session | undefined = sessions.find(sessionId)

      // Resolve the Promise if the session is already existing, reject otherwise
      if (session) {
        const videoId = session.video.videoRef
        if (videoId) {
          session.eventBus.publish(
            new UserJoinedSessionEvent(command.content.user, command.content.sessionReactions)
          )
          resolve(
            new JoinSessionResponse(
              new JoinSessionResponseContent(JoinSessionResponseStatus.SUCCESS, videoId)
            )
          )
        }
      } else {
        resolve(
          new JoinSessionResponse(
            new JoinSessionResponseContent(JoinSessionResponseStatus.SESSION_NOT_FOUND, '')
          )
        )
      }
    } else {
      resolve(
        new JoinSessionResponse(
          new JoinSessionResponseContent(JoinSessionResponseStatus.USER_ALREADY_JOINED, '')
        )
      )
    }
  })
}
