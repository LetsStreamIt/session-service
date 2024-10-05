import { Server, Socket } from 'socket.io'
import { RoomService } from '../../application/roomService'
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
  roomController: RoomService,
  roomReactions: RoomReactions
): () => void {
  return () => {
    roomController.leaveUserFromRoom(token, room, roomReactions)
  }
}
