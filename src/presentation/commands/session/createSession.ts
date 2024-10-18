import { Server, Socket } from 'socket.io'
import { CreateSessionCommand } from '../../../application/session/aggregates/session/commands/sessionCommands'
import { SessionCommandHandlers } from '../../../application/session/aggregates/session/commands/sessionCommandHandlers'
import { CreateSessionResponse } from '../ack/ack'

/**
 * Create Session Command
 * @param io
 * @param socket
 * @param token
 * @param commandHandlers
 * @returns
 */
export function recvCreateSessionCommand(
  io: Server,
  socket: Socket,
  token: string,
  commandHandlers: SessionCommandHandlers
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { videoUrl } = message

    commandHandlers
      .handleCreateSessionCommand(new CreateSessionCommand(token, videoUrl))
      .then((createSessionResponse: CreateSessionResponse) => ack(createSessionResponse))
  }
}
