import { ChatImpl, Room, RoomEntitySet, RoomId, RoomImpl } from '../model/room'
import { ChatUpdate, Notification, NotificationMessage, TextMessage } from '../model/message'
import { User, UserEntitySet, UserId } from '../model/user'

export class ChatController {
  rooms: RoomEntitySet

  constructor() {
    this.rooms = new RoomEntitySet([])
  }

  //private validateToken(token: string): boolean

  //private getUserInfoFromToken(token: string): [email, name, surname]

  private getUserEmailFromToken(token: string): UserId {
    return new UserId(token)
  }

  private getUserFromToken(token: string): User {
    return new User(this.getUserEmailFromToken(token), 'Name', 'Surname')
  }

  async isUserJoined(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.rooms.values.some((room) => room.isUserJoined(this.getUserFromToken(token)))) {
        reject()
      } else {
        resolve()
      }
    })
  }

  async joinUserToRoom(token: string, room: string): Promise<ChatUpdate> {
    return new Promise((resolve) => {
      const user: User = this.getUserFromToken(token)
      const roomId: RoomId = new RoomId(room)

      const chatMessages: TextMessage[] = []
      if (!this.rooms.add(new RoomImpl(roomId, new UserEntitySet([user]), new ChatImpl()))) {
        this.rooms.find(roomId)?.joinUser(user)

        const value = this.rooms.find(roomId)?.value
        if (value) {
          chatMessages.push(...value.getY.getMessages)
        }
      }
      resolve(new ChatUpdate(new NotificationMessage(user, Notification.JOINROOM), chatMessages))
    })
  }

  async sendMessage(token: string, message: string, room: string): Promise<TextMessage> {
    return new Promise((resolve) => {
      const user: User = this.getUserFromToken(token)
      const textMessage: TextMessage = new TextMessage(user, message)
      const r: Room | undefined = this.rooms.find(new RoomId(room))
      if (r) {
        r.sendMessage(textMessage)
      }
      resolve(textMessage)
    })
  }

  async leaveUserFromRoom(token: string, room: string): Promise<NotificationMessage> {
    return new Promise((resolve) => {
      const roomId: RoomId = new RoomId(room)
      const user: User = this.getUserFromToken(token)
      this.rooms.find(roomId)?.leaveUser(user)
      resolve(new NotificationMessage(user, Notification.LEAVEROOM))
    })
  }
}