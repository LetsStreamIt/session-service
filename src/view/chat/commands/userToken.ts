import { Namespace, Socket } from 'socket.io'
import { chatCommandListener } from '../utils'
import { joinCommand } from './joinRoom'
import { ChatController } from '../../../controllers/chat/chatController'
import { Ack } from '../../../model/message'

/**
 * User token command.
 * After the token is received and validated, it enables the client to send
 * a joinRoom message.
 * @param chatNamespace
 * @param socket
 * @param chatController
 * @returns
 */
export function userTokenCommand(
  chatNamespace: Namespace,
  socket: Socket,
  chatController: ChatController
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { token } = message
    chatCommandListener(
      socket,
      'joinRoom',
      joinCommand(chatNamespace, socket, token, chatController)
    )
    ack(Ack.OK)
  }
}
