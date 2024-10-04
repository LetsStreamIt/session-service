import { Server, Socket } from 'socket.io'
import { RoomController } from '../../controllers/room/roomController'
import { ChatReactions } from '../reactions/chatReactions'
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
  roomController: RoomController,
  roomReactions: RoomReactions,
  chatReactions: ChatReactions
): () => void {
  return () => {
    roomController.leaveUserFromRoom(token, room, roomReactions, chatReactions)
  }
}
