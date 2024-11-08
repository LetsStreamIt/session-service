import { Server, Socket } from 'socket.io'
import { acceptUserTokenCommand } from './userToken'
import { acceptDisconnectionCommand } from './disconnect'
import { ISessionService } from '../../../../../application/sessionService'
import { IProfileServiceUtils, IAuthServiceUtils } from '../../../../../domain/utils/serviceUtils'

/**
 * Accept connection command.
 * After the client successfully creates a connection, it enables the client to further:
 * 1. send the access token
 * 2. disconnect
 * @param io Socket IO Server
 * @param sessionService Session Service
 */
export function acceptConnectionCommand(
  io: Server,
  sessionService: ISessionService,
  profileServiceUtils: IProfileServiceUtils,
  authServiceUtils: IAuthServiceUtils
) {
  io.on('connection', (socket: Socket) => {
    acceptUserTokenCommand(io, socket, sessionService, profileServiceUtils, authServiceUtils)
    acceptDisconnectionCommand(socket)
  })
}
