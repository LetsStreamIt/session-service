import { JoinSessionCommand } from '../../../domain/aggregates/session/commands/sessionCommands'
import { getUserFromToken } from '../../../domain/aggregates/session/commands/utils'
import { UserJoinedEvent } from '../../../domain/aggregates/session/events/sessionEvents'
import { SessionRepository, SessionId, Session } from '../../../domain/aggregates/session/session'
import {
  JoinSessionResponse,
  JoinSessionResponseContent,
  JoinSessionResponseType
} from '../../../domain/command/response'
import { User } from '../../../domain/user'

function isUserJoined(sessions: SessionRepository, token: string): boolean {
  return sessions.getValues.some((session) => session.isUserJoined(getUserFromToken(token)))
}

export async function handleJoinSessionCommand(
  sessions: SessionRepository,
  command: JoinSessionCommand
): Promise<JoinSessionResponse> {
  return new Promise((resolve) => {
    if (!isUserJoined(sessions, command.token)) {
      const user: User = getUserFromToken(command.token)
      const sessionId: SessionId = new SessionId(command.sessionName)
      const session: Session | undefined = sessions.find(sessionId)

      // Resolve the Promise if the session is already existing, reject otherwise
      if (session) {
        const videoId = session.value?.getY.getY.getVideoId
        if (videoId) {
          session.eventBus().publish(new UserJoinedEvent(user, command.sessionReactions))
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
