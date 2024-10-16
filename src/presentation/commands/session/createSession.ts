import { Server, Socket } from 'socket.io'
import { Ack } from '../../../application/session/message'
import { CreateSessionCommand } from '../../../application/session/aggregates/session/commands/sessionCommands'
import { SessionCommandHandlers } from '../../../application/session/aggregates/session/commands/sessionCommandHandlers'

/**
 * Create Room Command
 * @param io
 * @param socket
 * @param token
 * @param commandHandlers
 * @returns
 */
export function recvCreateSessionCommand(
  io: Server,
  socket: Socket,
  token: string,
  commandHandlers: SessionCommandHandlers
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { room } = message

    commandHandlers
      .handleCreateRoomCommand(new CreateSessionCommand(token, room))
      .then((roomName: string) => {
        ack({ ack: Ack.OK, roomName: roomName })
      })
      .catch(() => {
        ack({ ack: Ack.FAILURE, roomName: '' })
      })
  }
}
