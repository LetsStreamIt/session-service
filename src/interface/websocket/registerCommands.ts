import { Server } from 'socket.io'
import { acceptConnectionCommand } from './commands/connection/connection'
import { SessionService } from '../../application/sessionService/sessionService'

/**
 * Registers Commands
 * @param io Socket IO Server
 */
export async function registerCommands(io: Server) {
  acceptConnectionCommand(io, new SessionService())
}
