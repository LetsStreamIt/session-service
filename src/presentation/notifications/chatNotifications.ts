import { Server, Socket } from 'socket.io'
import { NotificationMessage, TextMessage } from '../../application/session/message'
import { SerializerImpl } from '../presentation/serialization/messageSerializer'
import { ChatNotificationType } from './notification'

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
      .emit(
        ChatNotificationType.NOTIFICATION_MESSAGE,
        new SerializerImpl().serialize(notificationMessage)
      )
  }

  emitTextMessagesToClient(...textMessages: TextMessage[]) {
    this.socket.emit(
      ChatNotificationType.TEXT_MESSAGE,
      new SerializerImpl().serialize(textMessages)
    )
  }

  sendTextMessagesToSession(...textMessages: TextMessage[]) {
    this.io
      .to(this.sessionName)
      .emit(ChatNotificationType.TEXT_MESSAGE, new SerializerImpl().serialize(textMessages))
  }
}
