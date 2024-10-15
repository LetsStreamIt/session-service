import { Server, Socket } from 'socket.io'
import { recvUserTokenCommand } from './userToken'
import { commandListener, commandListenerWithVerification } from '../../utils'
import { SessionCommandHandlers } from '../../../application/commandHandlers/sessionCommandHandlers'
import { CommandType } from '../commandTypes'
import { recvDisconnectionCommand } from './disconnect'

/**
 * On connection command.
 * After the client successfully creates a connection with the chat namespace, it enables the client to further:
 * (1) send the token as first initialization step;
 * (2) disconnect from the namespace.
 * @param io
 * @param roomController
 */
export function connectionCommand(io: Server, roomController: SessionCommandHandlers) {
  commandListenerWithVerification(
    io,
    CommandType.CONNECTION,
    () => true,
    (socket: Socket) => {
      commandListener(
        socket,
        CommandType.USER_TOKEN,
        recvUserTokenCommand(io, socket, roomController)
      )
      commandListener(socket, CommandType.DISCONNECT, recvDisconnectionCommand(socket))
    }
  )
}
