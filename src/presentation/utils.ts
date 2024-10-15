import { Socket, Server } from 'socket.io'
import { Ack } from '../application/session/message'

/* Command listener util function
 * @param sn
 * @param command
 * @param verifyCommand
 * @param commandCallback
 */
export function commandListenerWithVerification<X>(
  sn: Socket | Server,
  command: string,
  verifyCommand: (argv: X) => boolean,
  commandCallback: (argv: X, ack: any) => void
): void {
  sn.on(command, (argv: X, ack) => {
    if (verifyCommand(argv)) {
      commandCallback(argv, ack)
    }
  })
}

/**
 * Command Listener with default message check.
 * @param socket
 * @param command
 * @param commandCallback
 */
export function commandListener(
  socket: Socket,
  command: string,
  commandCallback: (argv: any, ack: any) => void
) {
  // TODO: implement check
  commandListenerWithVerification(socket, command, () => true, commandCallback)
}

export function reaction<X>(promise: Promise<X>, successReaction: (x: X) => void, ack?: any) {
  promise
    .then((message: X) => {
      successReaction(message)
      ack(Ack.OK)
    })
    .catch(() => Ack.FAILURE)
}
