import { TextMessage } from '../message'
import { ChatImpl } from '../room/chat'
import { RoomRepository, RoomId, RoomImpl, Room, RoomEntry } from '../room/room'
import { User, UserRepository } from '../room/user'
import { getUserFromToken } from '../userUtils'
import { VideoImpl } from '../room/video'
import { sha256 } from 'js-sha256'
import {
  CreateSessionCommand,
  JoinSessionCommand,
  LeaveSessionCommand,
  PlayVideoCommand,
  SendMessageCommand,
  StopVideoCommand
} from './commands'

export class SessionCommandHandlers {
  rooms: RoomRepository

  constructor() {
    this.rooms = new RoomRepository()
  }

  isUserJoined(token: string): boolean {
    return this.rooms.getValues.some((room) => room.isUserJoined(getUserFromToken(token)))
  }

  async handleCreateRoomCommand(command: CreateSessionCommand): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.isYoutubeVideoIdValid(command.videoId)) {
        const roomName: string = this.roomNameFromTokenAndVideoId(command.token, command.videoId)

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
        resolve(roomName)
      } else {
        reject()
      }
    })
  }

  async handleJoinUserCommand(command: JoinSessionCommand): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isUserJoined(command.token)) {
        const user: User = getUserFromToken(command.token)
        const roomId: RoomId = new RoomId(command.sessionName)
        const room: Room | undefined = this.rooms.find(roomId)

        // Resolve the Promise if the room is already existing, reject otherwise
        if (room) {
          room.joinUser(user, command.notifications)
          resolve()
        } else {
          reject()
        }
      } else {
        reject()
      }
    })
  }

  async handleLeaveUserCommand(command: LeaveSessionCommand): Promise<void> {
    return new Promise((resolve) => {
      const roomId: RoomId = new RoomId(command.sessionName)
      const user: User = getUserFromToken(command.token)
      const room: Room | undefined = this.rooms.find(roomId)

      if (room) {
        room.leaveUser(user, command.notifications)
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

  async handleSendMessageCommand(command: SendMessageCommand): Promise<void> {
    return new Promise((resolve, reject) => {
      if (command.message !== '') {
        const user: User = getUserFromToken(command.token)
        const room: Room | undefined = this.rooms.find(new RoomId(command.sessionName))
        const textMessage: TextMessage = new TextMessage(user, command.message)
        if (room) {
          room.sendMessage(textMessage, command.notifications)
        }
        resolve()
      } else {
        reject()
      }
    })
  }

  async handlePlayVideoCommand(command: PlayVideoCommand): Promise<void> {
    return new Promise((resolve) => {
      const room: Room | undefined = this.rooms.find(new RoomId(command.sessionName))
      if (room) {
        room.playVideo(command.timestamp, command.notifications)
      }
      resolve()
    })
  }

  async handleStopVideoCommand(command: StopVideoCommand): Promise<void> {
    return new Promise((resolve) => {
      const room: Room | undefined = this.rooms.find(new RoomId(command.sessionName))
      if (room) {
        room.stopVideo(command.timestamp, command.notifications)
      }
      resolve()
    })
  }

  private isYoutubeVideoIdValid(videoId: string): boolean {
    return true
  }

  private roomNameFromTokenAndVideoId(token: string, videoId: string): string {
    return sha256(token + videoId)
  }
}
