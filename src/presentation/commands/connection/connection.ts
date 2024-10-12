import { Server, Socket } from 'socket.io'
import { userTokenCommand } from './userToken'
import { commandListener, commandListenerWithVerification } from '../../utils'
import { RoomService } from '../../../application/roomService'
import { Commands } from '../commands'
import { disconnectionCommand } from './disconnect'

/**
 * On connection command.
 * After the client successfully creates a connection with the chat namespace, it enables the client to further:
 * (1) send the token as first initialization step;
 * (2) disconnect from the namespace.
 * @param io
 * @param roomController
 */
export function connectionCommand(io: Server, roomController: RoomService) {
  commandListenerWithVerification(
    io,
    Commands.CONNECTION,
    () => true,
    (socket: Socket) => {
      commandListener(socket, Commands.USER_TOKEN, userTokenCommand(io, socket, roomController))
      commandListener(socket, Commands.DISCONNECT, disconnectionCommand(socket))
    }
  )
}
