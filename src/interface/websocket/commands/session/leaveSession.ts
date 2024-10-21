import { LeaveSessionCommand } from '../../../../application/session/aggregates/session/commands/sessionCommands'
import { SessionCommandHandlers } from '../../../../application/session/aggregates/session/commands/sessionCommandHandlers'
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
  commandHandlers: SessionCommandHandlers,
  sessionReactions: SessionReactions
): () => void {
  return () => {
    commandHandlers.handleLeaveUserCommand(
      new LeaveSessionCommand(token, sessionName, sessionReactions)
    )
  }
}
