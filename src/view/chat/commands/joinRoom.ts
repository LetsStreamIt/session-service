import { Namespace, Socket } from 'socket.io'
import { ChatUpdate } from '../../../model/message'
import { ChatController } from '../../../controllers/chat/chatController'
import { commandListener, reaction } from '../../utils'
import { leaveRoomCommand } from './leaveRoom'
import { sendMessageCommand } from './sendMessage'
import { SerializerImpl } from '../../../model/presentation/serialization/messageSerializer'

/**
 * Join Command.
 * Returns a function that joins a socketIO socket to the specified room.
 * After the client successfully joins a room, it enables the client to further:
 * (1) send a message to the room;
 * (2) leave the room.
 * @param chatNamespace
 * @param socket
 * @param token
 * @param chatController
 * @returns
 */
export function joinCommand(
  chatNamespace: Namespace,
  socket: Socket,
  token: string,
  chatController: ChatController
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { room } = message
    reaction(
      chatController.isUserJoined(token),
      () => {
        reaction(
          chatController.joinUserToRoom(token, room),
          (chatUpdate: ChatUpdate) => {
            chatNamespace
              .to(room)
              .emit(
                'notificationMessage',
                new SerializerImpl().serialize(chatUpdate.notificationMessage)
              )
            socket.join(room)
            socket.emit('chatUpdate', new SerializerImpl().serialize(chatUpdate.messages))
            commandListener(
              socket,
              'leaveRoom',
              leaveRoomCommand(chatNamespace, socket, room, token, chatController)
            )
            commandListener(
              socket,
              'sendMessage',
              sendMessageCommand(chatNamespace, token, room, chatController)
            )
          },
          ack
        )
      },
      ack
    )
  }
}
