import { Server, Socket } from 'socket.io'
import { commandListener } from '../../utils'
import { CommandType } from '../../../application/command/command'
import { SessionNotifications } from '../../notifications/sessionNotifications'
import { recvPlayVideoCommand, recvStopVideoCommand } from './video/videoCommands'
import { recvSendMessageCommand } from './chat/sendMessage'
import { recvLeaveSessionCommand } from './leaveSession'
import { JoinSessionCommand } from '../../../application/session/aggregates/session/commands/sessionCommands'
import { SessionCommandHandlers } from '../../../application/session/aggregates/session/commands/sessionCommandHandlers'
import { JoinSessionResponse, JoinSessionResponseType } from '../ack/ack'

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

    const notifications: SessionNotifications = new SessionNotifications(io, socket, room)
    commandHandlers
      .handleJoinUserCommand(new JoinSessionCommand(token, room, notifications))
      .then((joinSessionResponse: JoinSessionResponse) => {
        if (joinSessionResponse.content.responseType == JoinSessionResponseType.SUCCESS) {
          enableRecvLeaveSessionCommand(socket, token, room, commandHandlers, notifications)
          enableRecvChatCommands(socket, token, room, commandHandlers, notifications)
          enableRecvVideoCommands(socket, token, room, commandHandlers, notifications)
        }
        ack(joinSessionResponse)
      })
  }
}

function enableRecvLeaveSessionCommand(
  socket: Socket,
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
) {
  commandListener(
    socket,
    CommandType.LEAVE_ROOM,
    recvLeaveSessionCommand(room, token, commandHandlers, notifications)
  )
}

function enableRecvChatCommands(
  socket: Socket,
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
) {
  commandListener(
    socket,
    CommandType.SEND_MSG,
    recvSendMessageCommand(token, room, commandHandlers, notifications)
  )
}

function enableRecvVideoCommands(
  socket: Socket,
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
) {
  commandListener(
    socket,
    CommandType.PLAY_VIDEO,
    recvPlayVideoCommand(token, room, commandHandlers, notifications)
  )
  commandListener(
    socket,
    CommandType.STOP_VIDEO,
    recvStopVideoCommand(token, room, commandHandlers, notifications)
  )
}
