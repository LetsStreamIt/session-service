import { Server, Socket } from 'socket.io'
import { acceptCreateSessionCommand } from '../session/createSession'
import { acceptJoinSessionCommand } from '../session/joinSession'
import { ISessionService } from '../../../../../application/sessionService'
import { ResponseStatus, UserTokenResponse } from '../../../../../domain/common/command/response'
import { UserTokenCommand } from '../../../../../domain/aggregates/session/commands/sessionCommands'
import { CommandType } from '../../../../../domain/common/command/command'
import { IAuthServiceUtils, IProfileServiceUtils } from '../../../../../domain/utils/serviceUtils'

/**
 * Accept User token command.
 * If an access token message is received and accepted from Session Service,
 * enables the client to send Create Session Commands or Join Commands.
 * @param io Socket IO Server
 * @param socket Socket IO Socket
 * @param sessionService Session Service
 */
export function acceptUserTokenCommand(
  io: Server,
  socket: Socket,
  sessionService: ISessionService,
  profileServiceUtils: IProfileServiceUtils,
  authServiceUtils: IAuthServiceUtils
) {
  socket.on(CommandType.USER_TOKEN, (message, ack) => {
    const { token } = message
    sessionService
      .handleUserTokenCommand(new UserTokenCommand(token, profileServiceUtils, authServiceUtils))
      .then((userTokenResponse: UserTokenResponse) => {
        if (
          userTokenResponse.content.status == ResponseStatus.SUCCESS &&
          userTokenResponse.content.user
        ) {
          acceptCreateSessionCommand(socket, userTokenResponse.content.user, sessionService)
          acceptJoinSessionCommand(io, socket, userTokenResponse.content.user, sessionService)
        }
        ack(userTokenResponse)
      })
  })
}
