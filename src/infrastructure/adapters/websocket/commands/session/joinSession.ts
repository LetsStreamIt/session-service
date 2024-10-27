import { Server, Socket } from 'socket.io'
import { WSSessionReactions } from '../../reactions/sessionReactions'
import { ISessionService } from '../../../../../application/sessionService'
import { JoinSessionCommand } from '../../../../../domain/aggregates/session/commands/sessionCommands'
import { CommandType } from '../../../../../domain/common/command/command'
import {
  JoinSessionResponse,
  JoinSessionResponseType
} from '../../../../../domain/common/command/response'
import { ISessionReactions } from '../../../../../domain/common/reactions/sessionReactions'
import { acceptSendMessageCommand } from './chat/sendMessage'
import { acceptPlayVideoCommand, acceptStopVideoCommand } from './video/videoCommands'
import { User } from '../../../../../domain/common/user'
import { acceptLeaveSessionCommand } from './leaveSession'

/**
 * Accept Join Session Commands
 * 1. Forwards a Join Session Command to the Session Service
 * 2. If command is completed successfully, enables the client to send Leave Session Command,
 *    as well as Chat/Video Commands.
 * @param io Socket IO Server
 * @param socket Socket IO Socket
 * @param user access user
 * @param sessionService Session Servuce
 */
export function acceptJoinSessionCommand(
  io: Server,
  socket: Socket,
  user: User,
  sessionService: ISessionService
) {
  socket.on(CommandType.JOIN_SESSION, (message, ack) => {
    const { sessionName } = message
    const sessionReactions: ISessionReactions = new WSSessionReactions(io, socket, sessionName)
    sessionService
      .handleJoinSessionCommand(new JoinSessionCommand(user, sessionName, sessionReactions))
      .then((joinSessionResponse: JoinSessionResponse) => {
        if (joinSessionResponse.content.responseType == JoinSessionResponseType.SUCCESS) {
          acceptLeaveSessionCommand(socket, user, sessionName, sessionService, sessionReactions)
          acceptChatCommands(socket, user, sessionName, sessionService, sessionReactions)
          acceptVideoCommands(socket, user, sessionName, sessionService, sessionReactions)
        }
        ack(joinSessionResponse)
      })
  })
}

/**
 * Accept Chat Commands
 * @param socket Socket IO Socket
 * @param user access user
 * @param sessionName Session name
 * @param sessionService Session Service
 * @param sessionReactions Session Reactions
 */
function acceptChatCommands(
  socket: Socket,
  user: User,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
) {
  acceptSendMessageCommand(socket, user, sessionName, sessionService, sessionReactions)
}

/**
 * Accept Video Commands
 * @param socket Socket IO Socket
 * @param user access user
 * @param sessionName Session name
 * @param sessionService Session Service
 * @param sessionReactions Session Reactions
 * @returns
 */
function acceptVideoCommands(
  socket: Socket,
  user: User,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
) {
  acceptPlayVideoCommand(socket, user, sessionName, sessionService, sessionReactions)
  acceptStopVideoCommand(socket, user, sessionName, sessionService, sessionReactions)
}
