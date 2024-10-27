import { Socket } from 'socket.io'
import { CommandType } from '../../../../../domain/common/command/command'

/**
 * Accept disconnection commands of a socketIO socket.
 * @param socket Socket IO socket
 */
export function acceptDisconnectionCommand(socket: Socket) {
  socket.on(CommandType.DISCONNECT, () => socket.disconnect())
}
