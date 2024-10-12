import { TextMessage } from './message'
import { ChatImpl } from './room/chat'
import { RoomRepository, RoomId, RoomImpl, Room, RoomEntry } from './room/room'
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
        resolve()
      } else {
        reject()
      }
    })
  }

  async createRoom(roomName: string) {
    const roomId: RoomId = new RoomId(roomName)
    const TIMEOUT = 5_000
    this.rooms.add(new RoomImpl(roomId, new UserRepository(), new ChatImpl(), new VideoImpl()))
    setTimeout(() => {
      const room: Room | undefined = this.rooms.find(roomId)
      if (room) {
        if (room.value?.getX.getValues.length == 0) {
          this.rooms.remove(roomId)
        }
      }
    }, TIMEOUT)
  }

  async joinUserToRoom(
    token: string,
    roomName: string,
    roomReactions: RoomReactions
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const user: User = getUserFromToken(token)
      const roomId: RoomId = new RoomId(roomName)
      const room: Room | undefined = this.rooms.find(roomId)
      // Resolve the Promise if the room is already existing, reject otherwise
      if (room) {
        this.rooms.add(new RoomImpl(roomId, new UserRepository(), new ChatImpl(), new VideoImpl()))
        room.joinUser(user, roomReactions)
        resolve()
      }
      reject()
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

  private removeRoomWhenAllUserLeft(roomId: RoomId): void {
    const roomEntry: RoomEntry | undefined = this.rooms.find(roomId)?.value
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
