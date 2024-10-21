import { Server, Socket } from 'socket.io'
import { NotificationMessage, TextMessage } from '../../../application/session/message'
import { SerializerImpl } from '../../../presentation/serialization/messageSerializer'
import { ChatReactionType } from '../../../domain/reactions/reactions'
import { ChatReactions } from '../../../domain/reactions/chatReactions'

export class WSChatReactions implements ChatReactions {
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
        ChatReactionType.NOTIFICATION_MESSAGE,
        new SerializerImpl().serialize(notificationMessage)
      )
  }

  emitTextMessagesToClient(...textMessages: TextMessage[]) {
    this.socket.emit(ChatReactionType.TEXT_MESSAGE, new SerializerImpl().serialize(textMessages))
  }

  sendTextMessagesToSession(...textMessages: TextMessage[]) {
    this.io
      .to(this.sessionName)
      .emit(ChatReactionType.TEXT_MESSAGE, new SerializerImpl().serialize(textMessages))
  }
}
