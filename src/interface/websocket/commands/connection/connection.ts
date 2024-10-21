import { Server, Socket } from 'socket.io'
import { recvUserTokenCommand } from './userToken'
import { CommandType } from '../../../../domain/command/command'
import { recvDisconnectionCommand } from './disconnect'
import { commandListener } from '../../utils'
import { SessionCommandHandlers } from '../../../../application/session/aggregates/session/commands/sessionCommandHandlers'

/**
 * On connection command.
 * After the client successfully creates a connection with the chat namespace, it enables the client to further:
 * (1) send the token as first initialization step;
 * (2) disconnect from the namespace.
 * @param io
 * @param commandHandlers
 */
export function connectionCommand(io: Server, commandHandlers: SessionCommandHandlers) {
  commandListener(io, CommandType.CONNECTION, (socket: Socket) => {
    commandListener(
      socket,
      CommandType.USER_TOKEN,
      recvUserTokenCommand(io, socket, commandHandlers)
    )
    commandListener(socket, CommandType.DISCONNECT, recvDisconnectionCommand(socket))
  })
}
