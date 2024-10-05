import { Server } from 'socket.io'
import { Ack } from '../../model/message'
import { RoomAggregate } from '../../aggregates/room/roomAggregate'
import { RoomReactions } from '../reactions/roomReactions'

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
  roomController: RoomAggregate,
  roomReactions: RoomReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { message } = data
    roomController
      .sendMessage(token, message, room, roomReactions)
      .then(() => ack(Ack.OK))
      .catch(() => ack(Ack.FAILURE))
  }
}
