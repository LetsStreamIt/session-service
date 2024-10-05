import { Server, Socket } from 'socket.io'
import { ChatReactions } from './chatReactions'

export class RoomReactions {
  io: Server
  socket: Socket
  room: string
  chatReactions: ChatReactions

  constructor(io: Server, socket: Socket, room: string) {
    this.io = io
    this.socket = socket
    this.room = room
    this.chatReactions = new ChatReactions(io, socket, room)
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
}
