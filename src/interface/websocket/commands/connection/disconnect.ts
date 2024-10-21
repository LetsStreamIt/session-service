import { Socket } from 'socket.io'

/**
 * Diconnection command.
 * Disconnects a socketIO socket
 * @param socket
 * @returns
 */
export function recvDisconnectionCommand(socket: Socket): (message: any) => void {
  return () => socket.disconnect()
}
