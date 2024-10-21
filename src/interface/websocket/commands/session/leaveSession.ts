import { SessionService } from '../../../../application/service/sessionService'
import { LeaveSessionCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'
import { SessionReactions } from '../../../../domain/reactions/sessionReactions'

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
  sessionReactions: SessionReactions
): () => void {
  return () => {
    commandHandlers.handleLeaveUserCommand(
      new LeaveSessionCommand(token, sessionName, sessionReactions)
    )
  }
}
