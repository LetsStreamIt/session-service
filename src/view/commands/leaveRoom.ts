import { Server, Socket } from 'socket.io'
import { RoomAggregate } from '../../aggregates/room/roomAggregate'
import { RoomReactions } from '../reactions/roomReactions'

/**
 * Leave command.
 * Using the token and socket, leaves the user to the specified room.
 * @param io
 * @param socket
 * @param room
 * @param chatController
 * @returns
 */
export function leaveRoomCommand(
  io: Server,
  socket: Socket,
  room: string,
  token: string,
  roomController: RoomAggregate,
  roomReactions: RoomReactions
): () => void {
  return () => {
    roomController.leaveUserFromRoom(token, room, roomReactions)
  }
}
