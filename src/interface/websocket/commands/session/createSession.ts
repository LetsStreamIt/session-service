import { ISessionService } from '../../../../application/sessionService/sessionService'
import { CreateSessionCommand } from '../../../../domain/aggregates/session/commands/sessionCommands'
import { CreateSessionResponse } from '../../../../domain/command/response'
import { User } from '../../../../domain/user'

/**
 * Receives Create Session Commands
 * @param user User
 * @param sessionService Session Servuce
 * @returns
 */
export function recvCreateSessionCommand(
  user: User,
  sessionService: ISessionService
): (message: any, ack: any) => void {
  return (message, ack) => {
    const { videoUrl } = message

    sessionService
      .handleCreateSessionCommand(new CreateSessionCommand(user, videoUrl))
      .then((createSessionResponse: CreateSessionResponse) => ack(createSessionResponse))
  }
}
