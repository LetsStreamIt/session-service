import { SessionNotifications } from '../../notifications/sessionNotifications'
import { LeaveSessionCommand } from '../../../application/session/aggregates/session/commands/sessionCommands'
import { SessionCommandHandlers } from '../../../application/session/aggregates/session/commands/sessionCommandHandlers'

/**
 * Leave command.
 * Using the token and socket, leaves the user to the specified room.
 * @param io
 * @param socket
 * @param room
 * @param chatController
 * @returns
 */
export function recvLeaveSessionCommand(
  room: string,
  token: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
): () => void {
  return () => {
    commandHandlers.handleLeaveUserCommand(new LeaveSessionCommand(token, room, notifications))
  }
}
