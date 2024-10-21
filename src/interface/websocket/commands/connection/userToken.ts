import { Server, Socket } from 'socket.io'
import { commandListener } from '../../utils'
import { recvCreateSessionCommand } from '../session/createSession'
import { recvJoinSessionCommand } from '../session/joinSession'
import { SessionService } from '../../../../application/service/sessionService'
import { ResponseStatus, UserTokenResponse } from '../../../../domain/command/response'
import { CommandType } from '../../../../domain/command/command'
import { UserTokenCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'

/**
 * User token command.
 * After the token is received and validated, it enables the client to send
 * a joinSession message.
 * @param io
 * @param socket
 * @param chatController
 * @returns
 */
export function recvUserTokenCommand(
  io: Server,
  socket: Socket,
  commandHandlers: SessionService
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { token } = message

    commandHandlers
      .handleUserTokenCommand(new UserTokenCommand(token))
      .then((userTokenResponse: UserTokenResponse) => {
        if (userTokenResponse.content.status == ResponseStatus.SUCCESS) {
          commandListener(
            socket,
            CommandType.CREATE_SESSION,
            recvCreateSessionCommand(io, socket, token, commandHandlers)
          )
          commandListener(
            socket,
            CommandType.JOIN_SESSION,
            recvJoinSessionCommand(io, socket, token, commandHandlers)
          )
        }
        ack(userTokenResponse)
      })
  }
}
