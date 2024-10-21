import { Server, Socket } from 'socket.io'
import { WSChatReactions } from './chatReactions'
import { WSVideoReactions } from './videoReactions'
import { IChatReactions } from '../../../domain/reactions/chatReactions'
import { ISessionReactions } from '../../../domain/reactions/sessionReactions'
import { IVideoReactions } from '../../../domain/reactions/videoReactions'

/**
 * WebSocket Session Reactions
 */
export class WSSessionReactions implements ISessionReactions {
  io: Server
  socket: Socket
  sessionName: string
  chatReactions: IChatReactions
  videoReactions: IVideoReactions

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

  get getChatReactions() {
    return this.chatReactions
  }

  get getVideoReactions() {
    return this.videoReactions
  }
}
