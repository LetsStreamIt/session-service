import { Server, Socket } from 'socket.io'
import { WSChatReactions } from './chatReactions'
import { WSVideoReactions } from './videoReactions'
import { ChatReactions } from '../../../domain/reactions/chatReactions'
import { SessionReactions } from '../../../domain/reactions/sessionReactions'
import { VideoReactions } from '../../../domain/reactions/videoReactions'

export class WSSessionReactions implements SessionReactions {
  io: Server
  socket: Socket
  sessionName: string
  chatReactions: ChatReactions
  videoReactions: VideoReactions

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
