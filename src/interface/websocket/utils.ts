import { Server, Socket } from 'socket.io'
import { CommandType } from '../../domain/command/command'

/**
 * Socket IO Command Listener util function.
 * @param socket Socket IO Socket or Server
 * @param command string message command
 * @param commandCallback
 */
export function commandListener<X>(
  socket: Socket | Server,
  command: CommandType,
  commandCallback: (argv: X, ack: any) => void
) {
  socket.on(command, (argv: X, ack: any) => commandCallback(argv, ack))
}
