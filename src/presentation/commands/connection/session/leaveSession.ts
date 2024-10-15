import { Server, Socket } from 'socket.io'
import { SessionCommandHandlers } from '../../../../application/commands/sessionCommandHandlers'
import { SessionNotifications } from '../../../notifications/sessionNotifications'
import { LeaveSessionCommand } from '../../../../application/commands/sessionCommands'

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
  io: Server,
  socket: Socket,
  room: string,
  token: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
): () => void {
  return () => {
    commandHandlers.handleLeaveUserCommand(new LeaveSessionCommand(token, room, notifications))
  }
}
