import { RoomReactions } from '../../presentation/reactions/roomReactions'
import { Entity, Pair, Repository } from '../entity'
import { Message, MessageContent, TextMessage } from '../message'
import { Chat } from './chat'
import { User, UserRepository } from './user'

export class RoomId {
  roomName: string

  constructor(roomName: string) {
    this.roomName = roomName
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
