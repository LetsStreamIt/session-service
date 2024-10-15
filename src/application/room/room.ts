import { SessionNotifications } from '../../presentation/notifications/sessionNotifications'
import { Entity, Pair, Repository } from '../entity'
import { Message, MessageContent, TextMessage } from '../message'
import { Chat } from './chat'
import { User, UserRepository } from './user'
import { Video } from './video'

export class RoomId {
  roomName: string

  constructor(roomName: string) {
    this.roomName = roomName
  }
}

export class RoomEntry extends Pair<UserRepository, Pair<Chat, Video>> {}

export interface Room extends Entity<RoomId, RoomEntry> {
  isUserJoined(user: User): boolean

  joinUser(user: User, roomReactions: SessionNotifications): boolean

  leaveUser(user: User, roomReactions: SessionNotifications): boolean

  sendMessage(message: Message<MessageContent>, roomReactions: SessionNotifications): void

  playVideo(timestamp: number, roomReactions: SessionNotifications): void

  stopVideo(timestamp: number, roomReactions: SessionNotifications): void
}

export class RoomImpl implements Room {
  id: RoomId
  value?: RoomEntry | undefined

  constructor(id: RoomId, users: UserRepository, chat: Chat, video: Video) {
    this.id = id
    this.value = new RoomEntry(users, new Pair(chat, video))
  }

  isUserJoined(user: User): boolean {
    const users = this.value?.getX
    if (users) {
      return users.contains(user.id)
    }
    return false
  }

  joinUser(user: User, roomReactions: SessionNotifications): boolean {
    if (!this.isUserJoined(user)) {
      // Send join command to video and chat
      this.value?.getY.getX.userJoined(user, roomReactions.getChatReactions)
      this.value?.getY.getY.userJoined(user, roomReactions.getVideoReactions)

      this.value?.getX.add(user)
      roomReactions.joinUserToRoom()
      return true
    }
    return false
  }

  leaveUser(user: User, roomReactions: SessionNotifications): boolean {
    if (this.isUserJoined(user)) {
      if (this.value) {
        roomReactions.leaveUserFromRoomAndDisconnect()

        // Send leave command to video and chat
        this.value?.getY.getX.userLeft(user, roomReactions.getChatReactions)
        this.value?.getY.getY.userLeft(user, roomReactions.getVideoReactions)

        return this.value.getX.remove(user.id)
      }
    }
    return false
  }

  sendMessage(message: TextMessage, roomReactions: SessionNotifications): void {
    this.value?.getY.getX.sendMessage(message, roomReactions.chatReactions)
  }

  playVideo(timestamp: number, roomReactions: SessionNotifications): void {
    this.value?.getY.getY.playVideo(timestamp, roomReactions.videoReactions)
  }

  stopVideo(timestamp: number, roomReactions: SessionNotifications): void {
    this.value?.getY.getY.stopVideo(timestamp, roomReactions.videoReactions)
  }
}

export class RoomRepository extends Repository<Room> {}
