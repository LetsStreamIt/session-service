import { Server, Socket } from 'socket.io'
import { NotificationMessage, TextMessage } from '../../application/session/message'
import { SerializerImpl } from '../presentation/serialization/messageSerializer'

export class ChatNotifications {
  io: Server
  socket: Socket
  sessionName: string

  constructor(io: Server, socket: Socket, sessionName: string) {
    this.io = io
    this.socket = socket
    this.sessionName = sessionName
  }

  sendNotificationToSession(notificationMessage: NotificationMessage) {
    this.io
      .to(this.sessionName)
      .emit('notificationMessage', new SerializerImpl().serialize(notificationMessage))
  }

  emitTextMessagesToClient(...textMessages: TextMessage[]) {
    this.socket.emit('textMessage', new SerializerImpl().serialize(textMessages))
  }

  sendTextMessagesToSession(...textMessages: TextMessage[]) {
    this.io.to(this.sessionName).emit('textMessage', new SerializerImpl().serialize(textMessages))
  }
}
