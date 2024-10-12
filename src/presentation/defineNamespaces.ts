import { Server } from 'socket.io'
import { connectionCommand } from './commands/connection/connection'
import { RoomService } from '../application/roomService'

export async function registerCommands(io: Server) {
  connectionCommand(io, new RoomService())
}
