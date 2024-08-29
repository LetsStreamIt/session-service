import { Namespace, Socket } from 'socket.io'
import { commandListener, commandListenerWithVerification } from '../../utils'
import { disconnectionCommand } from './disconnect'
import { userTokenCommand } from './userToken'
import { ChatController } from '../../../controllers/chat/chatController'

/**
 * On connection command.
 * After the client successfully creates a connection with the chat namespace, it enables the client to further:
 * (1) send the token as first initialization step;
 * (2) disconnect from the namespace.
 * @param chatNamespace
 * @param chatController
 */
export function connectionCommand(chatNamespace: Namespace, chatController: ChatController) {
  commandListenerWithVerification(
    chatNamespace,
    'connection',
    () => true,
    (socket: Socket) => {
      commandListener(socket, 'userToken', userTokenCommand(chatNamespace, socket, chatController))
      commandListener(socket, 'disconnect', disconnectionCommand(socket))
    }
  )
}
