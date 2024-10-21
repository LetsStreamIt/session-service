import { Server, Socket } from 'socket.io'
import { SessionService } from '../../../../application/service/sessionService'
import { CreateSessionCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'
import { CreateSessionResponse } from '../../../../domain/command/response'

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
  commandHandlers: SessionService
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { videoUrl } = message

    commandHandlers
      .handleCreateSessionCommand(new CreateSessionCommand(token, videoUrl))
      .then((createSessionResponse: CreateSessionResponse) => ack(createSessionResponse))
  }
}
