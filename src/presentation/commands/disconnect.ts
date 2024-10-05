import { Socket } from 'socket.io'

/**
 * Diconnection command.
 * Disconnects a socketIO socket
 * @param socket
 * @returns
 */
export function disconnectionCommand(socket: Socket): (message: any) => void {
  return (message) => socket.disconnect()
}
