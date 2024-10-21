import { ISessionService } from '../../../../application/sessionService/sessionService'
import { CreateSessionCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'
import { CreateSessionResponse } from '../../../../domain/command/response'

/**
 * Receives Create Session Commands
 * @param io Socket IO Server
 * @param socket Socket IO Socket
 * @param token access token
 * @param sessionService Session Servuce
 * @returns
 */
export function recvCreateSessionCommand(
  token: string,
  sessionService: ISessionService
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { videoUrl } = message

    sessionService
      .handleCreateSessionCommand(new CreateSessionCommand(token, videoUrl))
      .then((createSessionResponse: CreateSessionResponse) => ack(createSessionResponse))
  }
}
