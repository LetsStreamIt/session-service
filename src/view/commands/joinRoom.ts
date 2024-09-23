import { Server, Socket } from 'socket.io'
import { ChatUpdate } from '../../model/message'
import { ChatController } from '../../controllers/chat/chatController'
import { leaveRoomCommand } from './leaveRoom'
import { SerializerImpl } from '../../model/presentation/serialization/messageSerializer'
import { sendMessageCommand } from './sendMessage'
import { commandListener, reaction } from '../utils'

/**
 * Join Command.
 * Returns a function that joins a socketIO socket to the specified room.
 * After the client successfully joins a room, it enables the client to further:
 * (1) send a message to the room;
 * (2) leave the room.
 * @param io
 * @param socket
 * @param token
 * @param chatController
 * @returns
 */
export function joinCommand(
  io: Server,
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
            io.to(room).emit(
              'notificationMessage',
              new SerializerImpl().serialize(chatUpdate.notificationMessage)
            )
            socket.join(room)
            socket.emit('chatUpdate', new SerializerImpl().serialize(chatUpdate.messages))
            commandListener(
              socket,
              'leaveRoom',
              leaveRoomCommand(io, socket, room, token, chatController)
            )
            defineChatCommands(io, socket, token, room, chatController)
            // Define video commands
          },
          ack
        )
      },
      ack
    )
  }
}

function defineChatCommands(
  io: Server,
  socket: Socket,
  token: string,
  room: string,
  chatController: ChatController
) {
  commandListener(socket, 'sendMessage', sendMessageCommand(io, token, room, chatController))
}
