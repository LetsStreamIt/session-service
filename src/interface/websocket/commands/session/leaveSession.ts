import { ISessionService } from '../../../../application/sessionService/sessionService'
import { LeaveSessionCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'
import { ISessionReactions } from '../../../../domain/reactions/sessionReactions'
import { User } from '../../../../domain/user'

/**
 * Receives Leave Session Commands.
 * @param sessionName Session name
 * @param user access user
 * @param sessionService Session Servuce
 * @param sessionReactions Session Reactions
 * @returns
 */
export function recvLeaveSessionCommand(
  sessionName: string,
  user: User,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
): () => void {
  return () => {
    sessionService.handleLeaveSessionCommand(
      new LeaveSessionCommand(user, sessionName, sessionReactions)
    )
  }
}
