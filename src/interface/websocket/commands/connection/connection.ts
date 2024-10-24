import { Server, Socket } from 'socket.io'
import { acceptUserTokenCommand } from './userToken'
import { acceptDisconnectionCommand } from './disconnect'
import { CommandType } from '../../../../domain/command/command'
import { ISessionService } from '../../../../application/sessionService/sessionService'

/**
 * Accept connection command.
 * After the client successfully creates a connection, it enables the client to further:
 * 1. send the access token
 * 2. disconnect
 * @param io Socket IO Server
 * @param sessionService Session Service
 */
export function acceptConnectionCommand(io: Server, sessionService: ISessionService) {
  io.on(CommandType.CONNECTION, (socket: Socket) => {
    acceptUserTokenCommand(io, socket, sessionService)
    acceptDisconnectionCommand(socket)
  })
}
