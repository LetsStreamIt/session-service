import { Server } from 'socket.io'
import { connectionCommand } from './commands/connection/connection'
import { SessionCommandHandlers } from '../application/commands/sessionCommandHandlers'

export async function registerCommands(io: Server) {
  connectionCommand(io, new SessionCommandHandlers())
}
