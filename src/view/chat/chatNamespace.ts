import { Namespace } from 'socket.io'
import { ChatController } from '../../controllers/chat/chatController'
import { SessionNamespace } from '../sessionNamespace'
import { connectionCommand } from './commands/connection'

export class ChatNamespace implements SessionNamespace {
  chatController: ChatController

  constructor() {
    this.chatController = new ChatController()
  }

  /**
   * Register Chat Commands to the given Namespace
   * @param chatNamespace
   */
  registerCommands(chatNamespace: Namespace) {
    connectionCommand(chatNamespace, this.chatController)
  }
}
