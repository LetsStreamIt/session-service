import { LeaveSessionCommand } from '../../../domain/aggregates/session/commands/sessionCommands'
import { UserLeftSessionEvent } from '../../../domain/aggregates/session/events/sessionEvents'
import { ISession, SessionId, SessionRepository } from '../../../domain/aggregates/session/session'
import { LeaveSessionResponse, ResponseStatus } from '../../../domain/command/response'

/**
 * Leave Session Command Handler.
 * Leaves the user from the Session, if existing.
 * @param sessions Session Repository
 * @param command Leave Session Command
 * @returns A Leave Session Response to send back to the client if the command is successfully executed.
 */
export async function handleLeaveSessionCommand(
  sessions: SessionRepository,
  command: LeaveSessionCommand
): Promise<LeaveSessionResponse> {
  return new Promise((resolve) => {
    const sessionId: SessionId = new SessionId(command.sessionName)
    const session: ISession | undefined = sessions.find(sessionId)
    if (session) {
      session.eventBus.publish(new UserLeftSessionEvent(command.user, command.sessionReactions))
      resolve(new LeaveSessionResponse(ResponseStatus.SUCCESS))
    } else {
      resolve(new LeaveSessionResponse(ResponseStatus.FAILURE))
    }
  })
}
