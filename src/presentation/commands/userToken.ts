import { Server, Socket } from 'socket.io'
import { commandListener } from '../utils'
import { joinCommand } from './joinRoom'
import { Ack } from '../../application/message'
import { RoomService } from '../../application/roomService'
import { Commands } from './commands'

/**
 * User token command.
 * After the token is received and validated, it enables the client to send
 * a joinRoom message.
 * @param io
 * @param socket
 * @param chatController
 * @returns
 */
export function userTokenCommand(
  io: Server,
  socket: Socket,
  roomController: RoomService
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { token } = message
    commandListener(socket, Commands.JOIN_ROOM, joinCommand(io, socket, token, roomController))
    ack(Ack.OK)
  }
}
