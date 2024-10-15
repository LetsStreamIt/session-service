import { Server, Socket } from 'socket.io'
import { NotificationMessage, TextMessage } from '../../application/message'
import { SerializerImpl } from '../presentation/serialization/messageSerializer'

export class ChatNotifications {
  io: Server
  socket: Socket
  room: string

  constructor(io: Server, socket: Socket, room: string) {
    this.io = io
    this.socket = socket
    this.room = room
  }

  sendNotificationToRoom(notificationMessage: NotificationMessage) {
    this.io
      .to(this.room)
      .emit('notificationMessage', new SerializerImpl().serialize(notificationMessage))
  }

  emitTextMessagesToClient(...textMessages: TextMessage[]) {
    this.socket.emit('textMessage', new SerializerImpl().serialize(textMessages))
  }

  sendTextMessagesToRoom(...textMessages: TextMessage[]) {
    this.io.to(this.room).emit('textMessage', new SerializerImpl().serialize(textMessages))
  }
}
