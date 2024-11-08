import { Socket } from 'socket.io'

/**
 * Accept disconnection commands of a socketIO socket.
 * @param socket Socket IO socket
 */
export function acceptDisconnectionCommand(socket: Socket) {
  socket.on('disconnect', () => socket.disconnect())
}
