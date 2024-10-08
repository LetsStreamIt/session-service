import { TextMessage } from './message'
import { ChatImpl } from './room/chat'
import { RoomRepository, RoomId, RoomImpl, Room } from './room/room'
import { User, UserRepository } from './room/user'
import { RoomReactions } from '../presentation/reactions/roomReactions'
import { getUserFromToken } from './userUtils'
import { VideoImpl } from './room/video'

export class RoomService {
  rooms: RoomRepository

  constructor() {
    this.rooms = new RoomRepository()
  }

  async isUserJoined(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.rooms.getValues.some((room) => room.isUserJoined(getUserFromToken(token)))) {
        reject()
      } else {
        resolve()
      }
    })
  }

  async joinUserToRoom(
    token: string,
    roomName: string,
    roomReactions: RoomReactions
  ): Promise<void> {
    return new Promise((resolve) => {
      const user: User = getUserFromToken(token)
      const roomId: RoomId = new RoomId(roomName)
      // Join the user to a new room, if not existing, or to an already-created one
      this.rooms.add(new RoomImpl(roomId, new UserRepository(), new ChatImpl(), new VideoImpl()))
      this.rooms.find(roomId)?.joinUser(user, roomReactions)
      resolve()
    })
  }

  async leaveUserFromRoom(
    token: string,
    roomName: string,
    roomReactions: RoomReactions
  ): Promise<void> {
    return new Promise((resolve) => {
      const roomId: RoomId = new RoomId(roomName)
      const user: User = getUserFromToken(token)
      const room: Room | undefined = this.rooms.find(roomId)

      if (room) {
        room.leaveUser(user, roomReactions)
        this.removeRoomWhenAllUserLeft(roomId)
      }
      resolve()
    })
  }

  private removeRoomWhenAllUserLeft(roomId: RoomId) {
    const roomEntry = this.rooms.find(roomId)?.value
    if (roomEntry) {
      if (roomEntry.getX.getValues.length == 0) {
        this.rooms.remove(roomId)
      }
    }
  }

  async sendMessage(
    token: string,
    message: string,
    roomName: string,
    roomReactions: RoomReactions
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (message !== '') {
        const user: User = getUserFromToken(token)
        const room: Room | undefined = this.rooms.find(new RoomId(roomName))
        const textMessage: TextMessage = new TextMessage(user, message)
        if (room) {
          room.sendMessage(textMessage, roomReactions)
        }
        resolve()
      } else {
        reject()
      }
    })
  }

  async playVideo(
    token: string,
    timestamp: number,
    roomName: string,
    roomReactions: RoomReactions
  ): Promise<void> {
    return new Promise((resolve) => {
      const room: Room | undefined = this.rooms.find(new RoomId(roomName))
      if (room) {
        room.playVideo(timestamp, roomReactions)
      }
      resolve()
    })
  }

  async stopVideo(
    token: string,
    timestamp: number,
    roomName: string,
    roomReactions: RoomReactions
  ): Promise<void> {
    return new Promise((resolve) => {
      const room: Room | undefined = this.rooms.find(new RoomId(roomName))
      if (room) {
        room.stopVideo(timestamp, roomReactions)
      }
      resolve()
    })
  }
}
