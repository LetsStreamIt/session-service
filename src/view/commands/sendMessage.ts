import { Server } from 'socket.io'
import { TextMessage } from '../../model/message'
import { reaction } from '../utils'
import { ChatController } from '../../controllers/chat/chatController'
import { SerializerImpl } from '../../model/presentation/serialization/messageSerializer'

/**
 * Send message command.
 * Sends a message to the room specified as parameter.
 * @param io
 * @param token
 * @param room
 * @param chatController
 * @returns
 */
export function sendMessageCommand(
  io: Server,
  token: string,
  room: string,
  chatController: ChatController
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { message } = data
    reaction(
      chatController.sendMessage(token, message, room),
      (textMessage: TextMessage) => {
        io.to(room).emit('textMessage', new SerializerImpl().serialize(textMessage))
      },
      ack
    )
  }
}
