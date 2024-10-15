import { sha256 } from 'js-sha256'
import { Server, Socket } from 'socket.io'
import { SessionCommandHandlers } from '../../../../application/commandHandlers/sessionCommandHandlers'
import { Ack } from '../../../../application/message'
import { CreateSessionCommand } from '../../../../application/commandHandlers/commands'

/**
 * Create Room Command
 * @param io
 * @param socket
 * @param token
 * @param roomController
 * @returns
 */
export function createRoomCommand(
  io: Server,
  socket: Socket,
  token: string,
  roomController: SessionCommandHandlers
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { room } = message

    roomController
      .handleCreateRoomCommand(new CreateSessionCommand(token, room))
      .then((roomName: string) => {
        ack({ ack: Ack.OK, roomName: roomName })
      })
      .catch(() => {
        ack({ ack: Ack.FAILURE, roomName: '' })
      })
  }
}
