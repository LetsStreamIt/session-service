import { Server } from 'socket.io'
import { Ack } from '../../model/message'
import { RoomController } from '../../controllers/room/roomController'
import { ChatReactions } from '../reactions/chatReactions'

/**
 * Send message command.
 * Sends a message to the room specified as parameter.
 * @param io
 * @param token
 * @param room
 * @param roomController
 * @returns
 */
export function sendMessageCommand(
  io: Server,
  token: string,
  room: string,
  roomController: RoomController,
  chatReactions: ChatReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { message } = data
    roomController
      .sendMessage(token, message, room, chatReactions)
      .then(() => ack(Ack.OK))
      .catch(() => ack(Ack.FAILURE))
  }
}
