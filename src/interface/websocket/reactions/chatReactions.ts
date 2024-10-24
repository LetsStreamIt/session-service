import { Server, Socket } from 'socket.io'
import { NotificationMessage, TextMessage } from '../../../domain/aggregates/chat/message'
import { IChatReactions, ChatReactionType } from '../../../domain/reactions/chatReactions'

/**
 * WebSocket Chat Reactions
 */
export class WSChatReactions implements IChatReactions {
  io: Server
  socket: Socket
  sessionName: string

  constructor(io: Server, socket: Socket, sessionName: string) {
    this.io = io
    this.socket = socket
    this.sessionName = sessionName
  }

  sendNotificationToSession(notificationMessage: NotificationMessage) {
    this.io.to(this.sessionName).emit(ChatReactionType.NOTIFICATION_MESSAGE, notificationMessage)
  }

  emitTextMessagesToClient(...textMessages: TextMessage[]) {
    this.socket.emit(ChatReactionType.TEXT_MESSAGE, textMessages)
  }

  sendTextMessagesToSession(...textMessages: TextMessage[]) {
    this.io.to(this.sessionName).emit(ChatReactionType.TEXT_MESSAGE, textMessages)
  }
}
