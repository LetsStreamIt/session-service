import { SessionService } from '../../../../application/sessionService/sessionService'
import { LeaveSessionCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'
import { ISessionReactions } from '../../../../domain/reactions/sessionReactions'

/**
 * Leave command.
 * Using the token and socket, leaves the user to the specified session.
 * @param io
 * @param socket
 * @param sessionName
 * @param chatController
 * @returns
 */
export function recvLeaveSessionCommand(
  sessionName: string,
  token: string,
  commandHandlers: SessionService,
  sessionReactions: ISessionReactions
): () => void {
  return () => {
    commandHandlers.handleLeaveSessionCommand(
      new LeaveSessionCommand(token, sessionName, sessionReactions)
    )
  }
}
