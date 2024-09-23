import { Server, Socket } from 'socket.io'
import { disconnectionCommand } from './disconnect'
import { userTokenCommand } from './userToken'
import { ChatController } from '../../controllers/chat/chatController'
import { commandListener, commandListenerWithVerification } from '../utils'

/**
 * On connection command.
 * After the client successfully creates a connection with the chat namespace, it enables the client to further:
 * (1) send the token as first initialization step;
 * (2) disconnect from the namespace.
 * @param io
 * @param chatController
 */
export function connectionCommand(io: Server, chatController: ChatController) {
  commandListenerWithVerification(
    io,
    'connection',
    () => true,
    (socket: Socket) => {
      commandListener(socket, 'userToken', userTokenCommand(io, socket, chatController))
      commandListener(socket, 'disconnect', disconnectionCommand(socket))
    }
  )
}
