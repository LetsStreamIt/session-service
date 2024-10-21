import { Server } from 'socket.io'
import { connectionCommand } from './commands/connection/connection'
import { SessionService } from '../../application/service/sessionService'

export async function registerCommands(io: Server) {
  connectionCommand(io, new SessionService())
}
