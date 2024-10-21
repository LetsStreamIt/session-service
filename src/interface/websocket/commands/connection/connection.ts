import { Server, Socket } from 'socket.io'
import { recvUserTokenCommand } from './userToken'
import { recvDisconnectionCommand } from './disconnect'
import { commandListener } from '../../utils'
import { SessionService } from '../../../../application/sessionService/sessionService'
import { CommandType } from '../../../../domain/command/command'

/**
 * On connection command.
 * After the client successfully creates a connection with the chat namespace, it enables the client to further:
 * (1) send the token as first initialization step;
 * (2) disconnect from the namespace.
 * @param io
 * @param commandHandlers
 */
export function connectionCommand(io: Server, commandHandlers: SessionService) {
  commandListener(io, CommandType.CONNECTION, (socket: Socket) => {
    commandListener(
      socket,
      CommandType.USER_TOKEN,
      recvUserTokenCommand(io, socket, commandHandlers)
    )
    commandListener(socket, CommandType.DISCONNECT, recvDisconnectionCommand(socket))
  })
}
