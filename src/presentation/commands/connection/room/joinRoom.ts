import { Server, Socket } from 'socket.io'
import { Ack } from '../../../../application/message'
import { commandListener } from '../../../utils'
import { RoomService } from '../../../../application/roomService'
import { Commands } from '../../commands'
import { RoomReactions } from '../../../reactions/roomReactions'
import { playVideoCommand, stopVideoCommand } from '../../videoCommands/videoCommands'
import { sendMessageCommand } from '../../chatCommands/sendMessage'
import { leaveRoomCommand } from './leaveRoom'

/**
 * Join Room Command.
 * @param io
 * @param socket
 * @param token
 * @param chatController
 * @returns
 */
export function joinRoomCommand(
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
        ack(Ack.FAILURE)
      })
      .catch(() => {
        // User is not joined, join it to the room
        const roomReactions: RoomReactions = new RoomReactions(io, socket, room)

        roomController
          .joinUserToRoom(token, room, roomReactions)
          .then(() => {
            // Enable the user to send leave room command, as well as text messages
            defineLeaveRoomCommand(io, socket, token, room, roomController, roomReactions)
            defineChatCommands(io, socket, token, room, roomController, roomReactions)
            defineVideoCommands(io, socket, token, room, roomController, roomReactions)

            ack(Ack.OK)
          })
          .catch(() => ack(Ack.OK))
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

function defineVideoCommands(
  io: Server,
  socket: Socket,
  token: string,
  room: string,
  roomController: RoomService,
  roomReactions: RoomReactions
) {
  commandListener(
    socket,
    Commands.PLAY_VIDEO,
    playVideoCommand(io, token, room, roomController, roomReactions)
  )
  commandListener(
    socket,
    Commands.STOP_VIDEO,
    stopVideoCommand(io, token, room, roomController, roomReactions)
  )
}
