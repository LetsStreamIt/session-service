import { ChatNotifications } from '../../presentation/notifications/chatNotifications'
import { TextMessage, NotificationMessage, Notification } from '../message'
import { User } from './user'

export interface Chat {
  userJoined(user: User, chatReactions: ChatNotifications): void

  userLeft(user: User, chatReactions: ChatNotifications): void

  sendMessage(message: TextMessage, chatReactions: ChatNotifications): void

  get getMessages(): TextMessage[]
}

export class ChatImpl implements Chat {
  private readonly messages: TextMessage[]

  constructor() {
    this.messages = []
  }

  userJoined(user: User, chatReactions: ChatNotifications): void {
    chatReactions.sendNotificationToRoom(new NotificationMessage(user, Notification.JOINROOM))
    chatReactions.emitTextMessagesToClient(...this.messages)
  }

  userLeft(user: User, chatReactions: ChatNotifications): void {
    chatReactions.sendNotificationToRoom(new NotificationMessage(user, Notification.LEAVEROOM))
  }

  sendMessage(message: TextMessage, chatReactions: ChatNotifications): void {
    this.messages.push(message)
    chatReactions.sendTextMessagesToRoom(message)
  }

  get getMessages(): TextMessage[] {
    return this.messages
  }
}
