import { Server, Socket } from 'socket.io'
import { commandListener } from '../../utils'
import { recvCreateSessionCommand } from '../session/createSession'
import { recvJoinSessionCommand } from '../session/joinSession'
import { ISessionService } from '../../../../application/sessionService/sessionService'
import { ResponseStatus, UserTokenResponse } from '../../../../domain/command/response'
import { CommandType } from '../../../../domain/command/command'
import { UserTokenCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'

/**
 * Enables receive User token command.
 * If an access token message is received and accepted from Session Service,
 * enables the client to send Create Session Commands or Join Commands.
 * @param io Socket IO Server
 * @param socket Socket IO Socket
 * @param sessionService Session Service
 * @returns
 */
export function recvUserTokenCommand(
  io: Server,
  socket: Socket,
  sessionService: ISessionService
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { token } = message

    sessionService
      .handleUserTokenCommand(new UserTokenCommand(token))
      .then((userTokenResponse: UserTokenResponse) => {
        if (
          userTokenResponse.content.status == ResponseStatus.SUCCESS &&
          userTokenResponse.content.user
        ) {
          commandListener(
            socket,
            CommandType.CREATE_SESSION,
            recvCreateSessionCommand(userTokenResponse.content.user, sessionService)
          )
          commandListener(
            socket,
            CommandType.JOIN_SESSION,
            recvJoinSessionCommand(io, socket, token, sessionService)
          )
        }
        ack(userTokenResponse)
      })
  }
}
