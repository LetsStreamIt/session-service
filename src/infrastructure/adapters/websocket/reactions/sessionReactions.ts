import { Server, Socket } from 'socket.io'
import { WSChatReactions } from './chatReactions'
import { WSVideoReactions } from './videoReactions'
import { IChatReactions } from '../../../../domain/common/reactions/chatReactions'
import { ISessionReactions } from '../../../../domain/common/reactions/sessionReactions'
import { IVideoReactions } from '../../../../domain/common/reactions/videoReactions'

/**
 * WebSocket Session Reactions
 */
export class WSSessionReactions implements ISessionReactions {
  readonly io: Server
  readonly socket: Socket
  readonly sessionName: string
  readonly chatReactions: IChatReactions
  readonly videoReactions: IVideoReactions

  constructor(io: Server, socket: Socket, sessionName: string) {
    this.io = io
    this.socket = socket
    this.sessionName = sessionName
    this.chatReactions = new WSChatReactions(io, socket, sessionName)
    this.videoReactions = new WSVideoReactions(io, socket, sessionName)
  }

  joinUserToSession() {
    this.socket.join(this.sessionName)
  }

  leaveUserFromSessionAndDisconnect() {
    this.socket.leave(this.sessionName)
    this.socket.disconnect()
  }
}
