import { Server } from 'socket.io'
import { connectionCommand } from './commands/connection/connection'
import { SessionCommandHandlers } from '../../application/session/aggregates/session/commands/sessionCommandHandlers'

export async function registerCommands(io: Server) {
  connectionCommand(io, new SessionCommandHandlers())
}
