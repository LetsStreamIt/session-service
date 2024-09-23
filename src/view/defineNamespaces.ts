import { Server } from 'socket.io'
import { connectionCommand } from './commands/connection'
import { ChatController } from '../controllers/chat/chatController'

export async function registerCommands(io: Server) {
  connectionCommand(io, new ChatController())
}
