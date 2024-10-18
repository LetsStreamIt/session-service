import { Server, Socket } from 'socket.io'
import { commandListener } from '../../utils'
import { CommandType } from '../../../application/command/command'
import { recvCreateSessionCommand } from '../session/createSession'
import { recvJoinSessionCommand } from '../session/joinSession'
import { SessionCommandHandlers } from '../../../application/session/aggregates/session/commands/sessionCommandHandlers'
import { ResponseStatus, UserTokenResponse } from '../ack/ack'
import { UserTokenCommand } from '../../../application/session/aggregates/session/commands/sessionCommands'

/**
 * User token command.
 * After the token is received and validated, it enables the client to send
 * a joinRoom message.
 * @param io
 * @param socket
 * @param chatController
 * @returns
 */
export function recvUserTokenCommand(
  io: Server,
  socket: Socket,
  commandHandlers: SessionCommandHandlers
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { token } = message

    commandHandlers
      .handleUserTokenCommand(new UserTokenCommand(token))
      .then((userTokenResponse: UserTokenResponse) => {
        if (userTokenResponse.content.status == ResponseStatus.SUCCESS) {
          commandListener(
            socket,
            CommandType.CREATE_ROOM,
            recvCreateSessionCommand(io, socket, token, commandHandlers)
          )
          commandListener(
            socket,
            CommandType.JOIN_ROOM,
            recvJoinSessionCommand(io, socket, token, commandHandlers)
          )
        }
        ack(userTokenResponse)
      })
  }
}
