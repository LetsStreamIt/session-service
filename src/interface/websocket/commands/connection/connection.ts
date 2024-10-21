import { Server, Socket } from 'socket.io'
import { recvUserTokenCommand } from './userToken'
import { recvDisconnectionCommand } from './disconnect'
import { commandListener } from '../../utils'
import { CommandType } from '../../../../domain/command/command'
import { ISessionService } from '../../../../application/sessionService/sessionService'

/**
 * On connection command.
 * After the client successfully creates a connection, it enables the client to further:
 * 1. send the access token
 * 2. disconnect
 * @param io Socket IO Server
 * @param sessionService Session Service
 */
export function recvConnectionCommand(io: Server, sessionService: ISessionService) {
  commandListener(io, CommandType.CONNECTION, (socket: Socket) => {
    commandListener(
      socket,
      CommandType.USER_TOKEN,
      recvUserTokenCommand(io, socket, sessionService)
    )
    commandListener(socket, CommandType.DISCONNECT, recvDisconnectionCommand(socket))
  })
}
