import { Notification, NotificationMessage, TextMessage } from '../../model/message'
import { ChatImpl, RoomRepository, RoomId, RoomImpl } from '../../model/room'
import { User, UserRepository } from '../../model/user'
import { ChatReactions } from '../../view/reactions/chatReactions'
import { RoomReactions } from '../../view/reactions/roomReactions'
import { getUserFromToken } from '../utils'

export class RoomController {
  rooms: RoomRepository

  constructor() {
    this.rooms = new RoomRepository([])
  }

  async isUserJoined(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.rooms.values.some((room) => room.isUserJoined(getUserFromToken(token)))) {
        reject()
      } else {
        resolve()
      }
    })
  }

  async joinUserToRoom(
    token: string,
    room: string,
    roomReactions: RoomReactions,
    chatReactions: ChatReactions
  ): Promise<void> {
    return new Promise((resolve) => {
      const user: User = getUserFromToken(token)
      const roomId: RoomId = new RoomId(room)

      const chatMessages: TextMessage[] = []
      if (!this.rooms.add(new RoomImpl(roomId, new UserRepository([user]), new ChatImpl()))) {
        this.rooms.find(roomId)?.joinUser(user)
        const value = this.rooms.find(roomId)?.value
        if (value) {
          chatMessages.push(...value.getY.getMessages)
        }
      }

      chatReactions.sendNotificationToRoom(new NotificationMessage(user, Notification.JOINROOM))
      roomReactions.joinUserToRoom()
      chatReactions.emitTextMessagesToClient(...chatMessages)
      resolve()
    })
  }

  async leaveUserFromRoom(
    token: string,
    room: string,
    roomReactions: RoomReactions,
    chatReactions: ChatReactions
  ): Promise<void> {
    return new Promise((resolve) => {
      const roomId: RoomId = new RoomId(room)
      const user: User = getUserFromToken(token)
      this.rooms.find(roomId)?.leaveUser(user)
      this.removeRoomWhenAllUserLeft(roomId)

      roomReactions.leaveUserFromRoomAndDisconnect()
      chatReactions.sendNotificationToRoom(new NotificationMessage(user, Notification.LEAVEROOM))
      resolve()
    })
  }

  private removeRoomWhenAllUserLeft(roomId: RoomId) {
    const roomEntry = this.rooms.find(roomId)?.value
    if (roomEntry) {
      if (roomEntry.getX.values.length == 0) {
        this.rooms.remove(roomId)
      }
    }
  }

  async sendMessage(
    token: string,
    message: string,
    room: string,
    chatReactions: ChatReactions
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (message !== '') {
        const user: User = getUserFromToken(token)
        const textMessage: TextMessage = new TextMessage(user, message)
        this.rooms.find(new RoomId(room))?.sendMessage(textMessage)
        chatReactions.sendTextMessagesToRoom(textMessage)
        resolve()
      } else {
        reject()
      }
    })
  }
}
