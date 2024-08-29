import { Server } from 'socket.io'
import { ChatNamespace } from './chat/chatNamespace'
import { SessionNamespace } from './sessionNamespace'
import { VideoNamespace } from './commands/videoCommands'

export async function registerCommands(io: Server) {
  // Register Chat Commands
  const chatNamespace: SessionNamespace = new ChatNamespace()
  chatNamespace.registerCommands(io.of('/chat'))

  //  Register Video Commands
  const videoNamespace: VideoNamespace = new VideoNamespace()
  videoNamespace.registerCommands(io.of('/video'))
}
