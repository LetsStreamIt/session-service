import { Server, Socket } from 'socket.io'
import { ChatUpdate, NotificationMessage, TextMessage } from '../../model/message'
import { SerializerImpl } from '../../model/presentation/serialization/messageSerializer'

export class ChatReactions {
  io: Server
  socket: Socket
  room: string

  constructor(io: Server, socket: Socket, room: string) {
    this.io = io
    this.socket = socket
    this.room = room
  }

  // TODO: split this method in sendNotification and sendMessage(s)
  userJoinedReaction(chatUpdate: ChatUpdate) {
    console.log('socket', this.socket.connected)
    this.io
      .to(this.room)
      .emit('notificationMessage', new SerializerImpl().serialize(chatUpdate.notificationMessage))
    if (chatUpdate.messages.length > 0) {
      this.io
        .to(this.socket.id)
        .emit('chatUpdate', new SerializerImpl().serialize(chatUpdate.messages))
      this.socket.emit('chatUpdate', new SerializerImpl().serialize(chatUpdate.messages))
    }
    this.socket.join(this.room)
  }

  leaveRoomSendNotification(notificationMessage: NotificationMessage) {
    this.socket.leave(this.room /*, token*/)
    this.socket.disconnect()
    this.io
      .to(this.room)
      .emit('notificationMessage', new SerializerImpl().serialize(notificationMessage))
  }

  sendTextMessage(textMessage: TextMessage) {
    this.io.to(this.room).emit('textMessage', new SerializerImpl().serialize(textMessage))
  }
}
