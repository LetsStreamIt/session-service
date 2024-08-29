import { Namespace } from 'socket.io'
import { SessionNamespace } from '../sessionNamespace'

export class VideoNamespace implements SessionNamespace {
  /**
   * Register Video Commands to the given Namespace
   * @param videoNamespace
   */
  registerCommands(videoNamespace: Namespace) {
    //connectionCommand(chatNamespace, this.chatController)
  }
}
