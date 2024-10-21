import { Server, Socket } from 'socket.io'
import { commandListener } from '../../utils'
import { CommandType } from '../../../../domain/command/command'
import { recvPlayVideoCommand, recvStopVideoCommand } from './video/videoCommands'
import { recvSendMessageCommand } from './chat/sendMessage'
import { recvLeaveSessionCommand } from './leaveSession'
import { JoinSessionCommand } from '../../../../application/session/aggregates/session/commands/sessionCommands'
import { SessionCommandHandlers } from '../../../../application/session/aggregates/session/commands/sessionCommandHandlers'
import { JoinSessionResponse, JoinSessionResponseType } from '../../../../domain/command/response'
import { SessionReactions } from '../../../../domain/reactions/sessionReactions'
import { WSSessionReactions } from '../../reactions/sessionReactions'

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

    const sessionReactions: SessionReactions = new WSSessionReactions(io, socket, sessionName)
    commandHandlers
      .handleJoinUserCommand(new JoinSessionCommand(token, sessionName, sessionReactions))
      .then((joinSessionResponse: JoinSessionResponse) => {
        if (joinSessionResponse.content.responseType == JoinSessionResponseType.SUCCESS) {
          enableRecvLeaveSessionCommand(
            socket,
            token,
            sessionName,
            commandHandlers,
            sessionReactions
          )
          enableRecvChatCommands(socket, token, sessionName, commandHandlers, sessionReactions)
          enableRecvVideoCommands(socket, token, sessionName, commandHandlers, sessionReactions)
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
  sessionReactions: SessionReactions
) {
  commandListener(
    socket,
    CommandType.LEAVE_SESSION,
    recvLeaveSessionCommand(sessionName, token, commandHandlers, sessionReactions)
  )
}

function enableRecvChatCommands(
  socket: Socket,
  token: string,
  sessionName: string,
  commandHandlers: SessionCommandHandlers,
  sessionReactions: SessionReactions
) {
  commandListener(
    socket,
    CommandType.SEND_MSG,
    recvSendMessageCommand(token, sessionName, commandHandlers, sessionReactions)
  )
}

function enableRecvVideoCommands(
  socket: Socket,
  token: string,
  sessionName: string,
  commandHandlers: SessionCommandHandlers,
  sessionReactions: SessionReactions
) {
  commandListener(
    socket,
    CommandType.PLAY_VIDEO,
    recvPlayVideoCommand(token, sessionName, commandHandlers, sessionReactions)
  )
  commandListener(
    socket,
    CommandType.STOP_VIDEO,
    recvStopVideoCommand(token, sessionName, commandHandlers, sessionReactions)
  )
}
