import { Server } from 'socket.io'
import { connectionCommand } from './commands/connection'
import { RoomAggregate } from '../aggregates/room/roomAggregate'

export async function registerCommands(io: Server) {
  connectionCommand(io, new RoomAggregate())
}
