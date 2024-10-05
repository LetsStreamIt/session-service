import { ChatReactions } from '../../view/reactions/chatReactions'
import { TextMessage, NotificationMessage, Notification } from '../message'
import { User } from './user'

export interface Chat {
  userJoined(user: User, chatReactions: ChatReactions): void

  userLeft(user: User, chatReactions: ChatReactions): void

  sendMessage(message: TextMessage, chatReactions: ChatReactions): void

  get getMessages(): TextMessage[]
}

export class ChatImpl implements Chat {
  private readonly messages: TextMessage[]

  constructor() {
    this.messages = []
  }

  userJoined(user: User, chatReactions: ChatReactions): void {
    chatReactions.sendNotificationToRoom(new NotificationMessage(user, Notification.JOINROOM))
    chatReactions.emitTextMessagesToClient(...this.messages)
  }

  userLeft(user: User, chatReactions: ChatReactions): void {
    chatReactions.sendNotificationToRoom(new NotificationMessage(user, Notification.LEAVEROOM))
  }

  sendMessage(message: TextMessage, chatReactions: ChatReactions): void {
    this.messages.push(message)
    chatReactions.sendTextMessagesToRoom(message)
  }

  get getMessages(): TextMessage[] {
    return this.messages
  }
}
