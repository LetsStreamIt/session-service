import { Socket } from 'socket.io'

/**
 * Command Listener with default message check.
 * @param socket
 * @param command
 * @param commandCallback
 */
export function commandListener<X>(
  socket: Socket,
  command: string,
  commandCallback: (argv: X, ack: any) => void
) {
  socket.on(command, (argv: X, ack) => commandCallback(argv, ack))
}
