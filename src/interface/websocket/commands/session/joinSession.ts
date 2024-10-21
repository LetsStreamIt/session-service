import { Server, Socket } from 'socket.io'
import { commandListener } from '../../utils'
import { WSSessionReactions } from '../../reactions/sessionReactions'
import { ISessionService } from '../../../../application/sessionService/sessionService'
import { JoinSessionCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'
import { CommandType } from '../../../../domain/command/command'
import { JoinSessionResponse, JoinSessionResponseType } from '../../../../domain/command/response'
import { ISessionReactions } from '../../../../domain/reactions/sessionReactions'
import { recvSendMessageCommand } from './chat/sendMessage'
import { recvLeaveSessionCommand } from './leaveSession'
import { recvPlayVideoCommand, recvStopVideoCommand } from './video/videoCommands'

/**
 * Receives Join Session Commands
 * 1. Forwards a Join Session Command to the Session Service
 * 2. If command is completed successfully, enables the client to send Leave Session Command,
 *    as well as Chat/Video Commands.
 * @param io Socket IO Server
 * @param socket Socket IO Socket
 * @param token access token
 * @param sessionService Session Servuce
 * @returns
 */
export function recvJoinSessionCommand(
  io: Server,
  socket: Socket,
  token: string,
  sessionService: ISessionService
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { sessionName } = message

    const sessionReactions: ISessionReactions = new WSSessionReactions(io, socket, sessionName)
    sessionService
      .handleJoinSessionCommand(new JoinSessionCommand(token, sessionName, sessionReactions))
      .then((joinSessionResponse: JoinSessionResponse) => {
        if (joinSessionResponse.content.responseType == JoinSessionResponseType.SUCCESS) {
          enableRecvLeaveSessionCommand(
            socket,
            token,
            sessionName,
            sessionService,
            sessionReactions
          )
          enableRecvChatCommands(socket, token, sessionName, sessionService, sessionReactions)
          enableRecvVideoCommands(socket, token, sessionName, sessionService, sessionReactions)
        }
        ack(joinSessionResponse)
      })
  }
}

/**
 * Enables receive Leave Session Commands
 * @param io Socket IO Server
 * @param socket Socket IO Socket
 * @param token access token
 * @param sessionService Session Servuce
 * @param sessionReactions Session Reactions
 * @returns
 */
function enableRecvLeaveSessionCommand(
  socket: Socket,
  token: string,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
) {
  commandListener(
    socket,
    CommandType.LEAVE_SESSION,
    recvLeaveSessionCommand(sessionName, token, sessionService, sessionReactions)
  )
}

/**
 * Enables receive Chat Commands
 * @param socket Socket IO Socket
 * @param token access token
 * @param sessionName Session name
 * @param sessionService Session Servuce
 * @param sessionReactions Session Reactions
 * @returns
 */
function enableRecvChatCommands(
  socket: Socket,
  token: string,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
) {
  commandListener(
    socket,
    CommandType.SEND_MSG,
    recvSendMessageCommand(token, sessionName, sessionService, sessionReactions)
  )
}

/**
 * Enables receive Video Commands
 * @param socket Socket IO Socket
 * @param token access token
 * @param sessionName Session name
 * @param sessionService Session Servuce
 * @param sessionReactions Session Reactions
 * @returns
 */
function enableRecvVideoCommands(
  socket: Socket,
  token: string,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
) {
  commandListener(
    socket,
    CommandType.PLAY_VIDEO,
    recvPlayVideoCommand(token, sessionName, sessionService, sessionReactions)
  )
  commandListener(
    socket,
    CommandType.STOP_VIDEO,
    recvStopVideoCommand(token, sessionName, sessionService, sessionReactions)
  )
}
