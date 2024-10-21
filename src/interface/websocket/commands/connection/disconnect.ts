import { Socket } from 'socket.io'

/**
 * Disconnects a socketIO socket.
 * @param socket Socket IO socket
 * @returns
 */
export function recvDisconnectionCommand(socket: Socket): (message: any) => void {
  return () => socket.disconnect()
}
