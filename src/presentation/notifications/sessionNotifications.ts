import { Server, Socket } from 'socket.io'
import { ChatNotifications } from './chatNotifications'
import { VideoNotifications } from './videoNotifications'

export class SessionNotifications {
  io: Server
  socket: Socket
  room: string
  chatReactions: ChatNotifications
  videoReactions: VideoNotifications

  constructor(io: Server, socket: Socket, room: string) {
    this.io = io
    this.socket = socket
    this.room = room
    this.chatReactions = new ChatNotifications(io, socket, room)
    this.videoReactions = new VideoNotifications(io, socket, room)
  }

  joinUserToRoom() {
    this.socket.join(this.room)
  }

  leaveUserFromRoomAndDisconnect() {
    this.socket.leave(this.room)
    this.socket.disconnect()
  }

  get getChatReactions() {
    return this.chatReactions
  }

  get getVideoReactions() {
    return this.videoReactions
  }
}
