import { Server, Socket } from 'socket.io'
import { ChatReactions } from './chatReactions'
import { VideoReactions } from './videoReactions'

export class RoomReactions {
  io: Server
  socket: Socket
  room: string
  chatReactions: ChatReactions
  videoReactions: VideoReactions

  constructor(io: Server, socket: Socket, room: string) {
    this.io = io
    this.socket = socket
    this.room = room
    this.chatReactions = new ChatReactions(io, socket, room)
    this.videoReactions = new VideoReactions(io, socket, room)
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
