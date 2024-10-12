import { Server, Socket } from 'socket.io'
import { commandListener } from '../../utils'
import { joinRoomCommand } from './room/joinRoom'
import { Ack } from '../../../application/message'
import { RoomService } from '../../../application/roomService'
import { Commands } from '../commands'
import { createRoomCommand } from './room/createRoom'

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
    commandListener(
      socket,
      Commands.CREATE_ROOM,
      createRoomCommand(io, socket, token, roomController)
    )
    commandListener(socket, Commands.JOIN_ROOM, joinRoomCommand(io, socket, token, roomController))
    ack(Ack.OK)
  }
}
