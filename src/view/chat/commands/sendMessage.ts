import { Namespace } from 'socket.io'
import { Ack, TextMessage } from '../../../model/message'
import { chatReaction } from '../utils'
import { ChatController } from '../../../controllers/chatController'
import { SerializerImpl } from '../../../model/presentation/serialization/messageSerializer'

/**
 * Send message command.
 * Sends a message to the room specified as parameter.
 * @param chatNamespace
 * @param token
 * @param room
 * @param chatController
 * @returns
 */
export function sendMessageCommand(
  chatNamespace: Namespace,
  token: string,
  room: string,
  chatController: ChatController
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { message } = data
    chatReaction(
      chatController.sendMessage(token, message, room),
      (textMessage: TextMessage) => {
        chatNamespace.to(room).emit('textMessage', new SerializerImpl().serialize(textMessage))
        ack(Ack.OK)
      },
      ack
    )
  }
}
