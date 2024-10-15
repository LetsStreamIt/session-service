import { Server, Socket } from 'socket.io'
import { Ack } from '../../../../application/message'
import { commandListener } from '../../../utils'
import { SessionCommandHandlers } from '../../../../application/commands/sessionCommandHandlers'
import { CommandType } from '../../commandTypes'
import { SessionNotifications } from '../../../notifications/sessionNotifications'
import { recvPlayVideoCommand, recvStopVideoCommand } from '../../videoCommands/videoCommands'
import { recvSendMessageCommand } from '../../chatCommands/sendMessage'
import { recvLeaveSessionCommand } from './leaveSession'
import { JoinSessionCommand } from '../../../../application/commands/sessionCommands'

/**
 * Join Room Command.
 * @param io
 * @param socket
 * @param token
 * @param chatController
 * @returns
 */
export function recvJoinSessionCommand(
  io: Server,
  socket: Socket,
  token: string,
  commandHandlers: SessionCommandHandlers
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { room } = message

    // User is not joined, join it to the room
    const notifications: SessionNotifications = new SessionNotifications(io, socket, room)

    commandHandlers
      .handleJoinUserCommand(new JoinSessionCommand(token, room, notifications))
      .then(() => {
        // Enable the user to send leave room command, as well as text messages
        enableRecvLeaveSessionCommand(io, socket, token, room, commandHandlers, notifications)
        enableRecvChatCommands(io, socket, token, room, commandHandlers, notifications)
        enableRecvVideoCommands(io, socket, token, room, commandHandlers, notifications)

        ack(Ack.OK)
      })
      .catch(() => ack(Ack.FAILURE))
  }
}

function enableRecvLeaveSessionCommand(
  io: Server,
  socket: Socket,
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
) {
  commandListener(
    socket,
    CommandType.LEAVE_ROOM,
    recvLeaveSessionCommand(io, socket, room, token, commandHandlers, notifications)
  )
}

function enableRecvChatCommands(
  io: Server,
  socket: Socket,
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
) {
  commandListener(
    socket,
    CommandType.SEND_MSG,
    recvSendMessageCommand(io, token, room, commandHandlers, notifications)
  )
}

function enableRecvVideoCommands(
  io: Server,
  socket: Socket,
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
) {
  commandListener(
    socket,
    CommandType.PLAY_VIDEO,
    recvPlayVideoCommand(io, token, room, commandHandlers, notifications)
  )
  commandListener(
    socket,
    CommandType.STOP_VIDEO,
    recvStopVideoCommand(io, token, room, commandHandlers, notifications)
  )
}
