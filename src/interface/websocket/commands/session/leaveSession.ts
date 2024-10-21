import { ISessionService } from '../../../../application/sessionService/sessionService'
import { LeaveSessionCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'
import { ISessionReactions } from '../../../../domain/reactions/sessionReactions'

/**
 * Receives Leave Session Commands.
 * @param sessionName Session name
 * @param token access token
 * @param sessionService Session Servuce
 * @param sessionReactions Session Reactions
 * @returns
 */
export function recvLeaveSessionCommand(
  sessionName: string,
  token: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
): () => void {
  return () => {
    sessionService.handleLeaveSessionCommand(
      new LeaveSessionCommand(token, sessionName, sessionReactions)
    )
  }
}
