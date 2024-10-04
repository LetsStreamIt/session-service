import { Server } from 'socket.io'
import { connectionCommand } from './commands/connection'
import { RoomController } from '../controllers/room/roomController'

export async function registerCommands(io: Server) {
  connectionCommand(io, new RoomController())
}
