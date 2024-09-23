import { Server, Socket } from 'socket.io'
import { commandListener } from '../utils'
import { joinCommand } from './joinRoom'
import { ChatController } from '../../controllers/chat/chatController'
import { Ack } from '../../model/message'

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
  chatController: ChatController
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { token } = message
    console.log('token received')
    commandListener(socket, 'joinRoom', joinCommand(io, socket, token, chatController))
    ack(Ack.OK)
  }
}
