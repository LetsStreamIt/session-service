import { Server, Socket } from 'socket.io'
import { Ack } from '../../model/message'
import { leaveRoomCommand } from './leaveRoom'
import { sendMessageCommand } from './sendMessage'
import { commandListener } from '../utils'
import { RoomController } from '../../controllers/room/roomController'
import { ChatReactions } from '../reactions/chatReactions'
import { Commands } from './commands'

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
  roomController: RoomController
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { room } = message

    roomController
      .isUserJoined(token)
      .then(() => {
        // User is not joined, join it to the room
        const chatReactions: ChatReactions = new ChatReactions(io, socket, room)
        roomController
          .joinUserToRoom(token, room, chatReactions)
          .then(() => {
            // Enable the user to send leave room command, as well as text messages
            defineLeaveRoomCommand(io, socket, token, room, roomController, chatReactions)
            defineChatCommands(io, socket, token, room, roomController, chatReactions)
            ack(Ack.OK)
          })
          .catch(() => ack(Ack.FAILURE))
      })
      .catch(() => {
        ack(Ack.FAILURE)
      })
  }
}

function defineLeaveRoomCommand(
  io: Server,
  socket: Socket,
  token: string,
  room: string,
  roomController: RoomController,
  chatReactions: ChatReactions
) {
  commandListener(
    socket,
    Commands.LEAVE_ROOM,
    leaveRoomCommand(io, socket, room, token, roomController, chatReactions)
  )
}

function defineChatCommands(
  io: Server,
  socket: Socket,
  token: string,
  room: string,
  roomController: RoomController,
  chatReactions: ChatReactions
) {
  commandListener(
    socket,
    Commands.SEND_MSG,
    sendMessageCommand(io, token, room, roomController, chatReactions)
  )
}
