import { Server, Socket } from 'socket.io'
import { commandListener } from '../../utils'
import { CommandType } from '../../../application/command/command'
import { SessionNotifications } from '../../notifications/sessionNotifications'
import { recvPlayVideoCommand, recvStopVideoCommand } from './video/videoCommands'
import { recvSendMessageCommand } from './chat/sendMessage'
import { recvLeaveSessionCommand } from './leaveSession'
import { JoinSessionCommand } from '../../../application/session/aggregates/session/commands/sessionCommands'
import { SessionCommandHandlers } from '../../../application/session/aggregates/session/commands/sessionCommandHandlers'
import { JoinSessionResponse, JoinSessionResponseType } from '../response/response'

/**
 * Join Session Command.
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
    const { sessionName } = message

    const notifications: SessionNotifications = new SessionNotifications(io, socket, sessionName)
    commandHandlers
      .handleJoinUserCommand(new JoinSessionCommand(token, sessionName, notifications))
      .then((joinSessionResponse: JoinSessionResponse) => {
        if (joinSessionResponse.content.responseType == JoinSessionResponseType.SUCCESS) {
          enableRecvLeaveSessionCommand(socket, token, sessionName, commandHandlers, notifications)
          enableRecvChatCommands(socket, token, sessionName, commandHandlers, notifications)
          enableRecvVideoCommands(socket, token, sessionName, commandHandlers, notifications)
        }
        ack(joinSessionResponse)
      })
  }
}

function enableRecvLeaveSessionCommand(
  socket: Socket,
  token: string,
  sessionName: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
) {
  commandListener(
    socket,
    CommandType.LEAVE_SESSION,
    recvLeaveSessionCommand(sessionName, token, commandHandlers, notifications)
  )
}

function enableRecvChatCommands(
  socket: Socket,
  token: string,
  sessionName: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
) {
  commandListener(
    socket,
    CommandType.SEND_MSG,
    recvSendMessageCommand(token, sessionName, commandHandlers, notifications)
  )
}

function enableRecvVideoCommands(
  socket: Socket,
  token: string,
  sessionName: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
) {
  commandListener(
    socket,
    CommandType.PLAY_VIDEO,
    recvPlayVideoCommand(token, sessionName, commandHandlers, notifications)
  )
  commandListener(
    socket,
    CommandType.STOP_VIDEO,
    recvStopVideoCommand(token, sessionName, commandHandlers, notifications)
  )
}
