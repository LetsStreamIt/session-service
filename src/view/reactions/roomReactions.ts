import { Server, Socket } from 'socket.io'

export class RoomReactions {
  io: Server
  socket: Socket
  room: string

  constructor(io: Server, socket: Socket, room: string) {
    this.io = io
    this.socket = socket
    this.room = room
  }

  joinUserToRoom() {
    this.socket.join(this.room)
  }

  leaveUserFromRoomAndDisconnect() {
    this.socket.leave(this.room)
    this.socket.disconnect()
  }
}
