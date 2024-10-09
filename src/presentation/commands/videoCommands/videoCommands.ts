import { Server } from 'socket.io'
import { Ack } from '../../../application/message'
import { RoomService } from '../../../application/roomService'
import { RoomReactions } from '../../reactions/roomReactions'

/**
 * Play video command
 * @param io
 * @param token
 * @param room
 * @param roomController
 * @param roomReactions
 * @returns
 */
export function playVideoCommand(
  io: Server,
  token: string,
  room: string,
  roomController: RoomService,
  roomReactions: RoomReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { timestamp } = data

    roomController
      .playVideo(token, timestamp, room, roomReactions)
      .then(() => ack(Ack.OK))
      .catch(() => ack(Ack.FAILURE))
  }
}

/**
 * Stop video command
 * @param io
 * @param token
 * @param room
 * @param roomController
 * @param roomReactions
 * @returns
 */
export function stopVideoCommand(
  io: Server,
  token: string,
  room: string,
  roomController: RoomService,
  roomReactions: RoomReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { timestamp } = data

    roomController
      .stopVideo(token, timestamp, room, roomReactions)
      .then(() => ack(Ack.OK))
      .catch(() => ack(Ack.FAILURE))
  }
}
