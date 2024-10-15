import { Server, Socket } from 'socket.io'
import { commandListener } from '../../utils'
import { Ack } from '../../../application/message'
import { SessionCommandHandlers } from '../../../application/commands/sessionCommandHandlers'
import { CommandType } from '../commandTypes'
import { recvCreateSessionCommand } from './session/createSession'
import { recvJoinSessionCommand } from './session/joinSession'

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
    ack(Ack.OK)
  }
}
