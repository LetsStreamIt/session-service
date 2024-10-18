import { Server, Socket } from 'socket.io'
import { ChatNotifications } from './chatNotifications'
import { VideoNotifications } from './videoNotifications'

export class SessionNotifications {
  io: Server
  socket: Socket
  sessionName: string
  chatReactions: ChatNotifications
  videoReactions: VideoNotifications

  constructor(io: Server, socket: Socket, sessionName: string) {
    this.io = io
    this.socket = socket
    this.sessionName = sessionName
    this.chatReactions = new ChatNotifications(io, socket, sessionName)
    this.videoReactions = new VideoNotifications(io, socket, sessionName)
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
