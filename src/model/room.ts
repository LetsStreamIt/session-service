import { ChatReactions } from '../view/reactions/chatReactions'
import { RoomReactions } from '../view/reactions/roomReactions'
import { Entity, Repository } from './entity'
import { Message, MessageContent, Notification, NotificationMessage, TextMessage } from './message'
import { User, UserRepository } from './user'

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

export class RoomId {
  roomName: string

  constructor(roomName: string) {
    this.roomName = roomName
  }
}

export class Pair<X, Y> {
  private readonly x: X
  private readonly y: Y

  constructor(x: X, y: Y) {
    this.x = x
    this.y = y
  }

  get getX(): X {
    return this.x
  }

  get getY(): Y {
    return this.y
  }
}

export class RoomEntry extends Pair<UserRepository, Chat> {}

export interface Room extends Entity<RoomId, RoomEntry> {
  isUserJoined(user: User): boolean

  joinUser(user: User, roomReactions: RoomReactions): boolean

  leaveUser(user: User, roomReactions: RoomReactions): boolean

  sendMessage(message: Message<MessageContent>, roomReactions: RoomReactions): void
}

export class RoomImpl implements Room {
  id: RoomId
  value?: RoomEntry | undefined

  constructor(id: RoomId, users: UserRepository, chat: Chat) {
    this.id = id
    this.value = new RoomEntry(users, chat)
  }

  isUserJoined(user: User): boolean {
    const users = this.value?.getX
    if (users) {
      return users.contains(user.id)
    }
    return false
  }

  joinUser(user: User, roomReactions: RoomReactions): boolean {
    if (!this.isUserJoined(user)) {
      this.value?.getY.userJoined(user, roomReactions.getChatReactions)
      this.value?.getX.add(user)
      roomReactions.joinUserToRoom()
      return true
    }
    return false
  }

  leaveUser(user: User, roomReactions: RoomReactions): boolean {
    if (this.isUserJoined(user)) {
      if (this.value) {
        this.value?.getY.userLeft(user, roomReactions.getChatReactions)
        roomReactions.leaveUserFromRoomAndDisconnect()
        return this.value.getX.remove(user.id)
      }
    }
    return false
  }

  sendMessage(message: TextMessage, roomReactions: RoomReactions): void {
    this.value?.getY.sendMessage(message, roomReactions.chatReactions)
  }
}

export class RoomRepository extends Repository<Room> {}
