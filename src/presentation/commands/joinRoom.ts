import { Server, Socket } from 'socket.io'
import { Ack } from '../../application/message'
import { leaveRoomCommand } from './leaveRoom'
import { sendMessageCommand } from './sendMessage'
import { commandListener } from '../utils'
import { RoomService } from '../../application/roomService'
import { Commands } from './commands'
import { RoomReactions } from '../reactions/roomReactions'

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
  roomController: RoomService
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { room } = message

    roomController
      .isUserJoined(token)
      .then(() => {
        // User is not joined, join it to the room
        const roomReactions: RoomReactions = new RoomReactions(io, socket, room)

        roomController
          .joinUserToRoom(token, room, roomReactions)
          .then(() => {
            // Enable the user to send leave room command, as well as text messages
            defineLeaveRoomCommand(io, socket, token, room, roomController, roomReactions)
            defineChatCommands(io, socket, token, room, roomController, roomReactions)
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
  roomController: RoomService,
  roomReactions: RoomReactions
) {
  commandListener(
    socket,
    Commands.LEAVE_ROOM,
    leaveRoomCommand(io, socket, room, token, roomController, roomReactions)
  )
}

function defineChatCommands(
  io: Server,
  socket: Socket,
  token: string,
  room: string,
  roomController: RoomService,
  roomReactions: RoomReactions
) {
  commandListener(
    socket,
    Commands.SEND_MSG,
    sendMessageCommand(io, token, room, roomController, roomReactions)
  )
}
