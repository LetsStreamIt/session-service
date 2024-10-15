import { TextMessage } from '../session/message'
import { getUserFromToken } from './utils'
import { sha256 } from 'js-sha256'
import { CreateSessionCommand, JoinSessionCommand, LeaveSessionCommand } from './sessionCommands'

import { SendMessageCommand } from './chatCommands'
import { PlayVideoCommand, StopVideoCommand } from './videoCommands'
import {
  RoomRepository,
  SessionId,
  Session,
  SessionImpl,
  SessionEntry
} from '../session/aggregates/session'
import { User } from '../session/aggregates/user'
import {
  UserJoinedEvent,
  UserLeftSessionEvent,
  MessageSentEvent,
  VideoPlayedEvent,
  VideoStoppedEvent
} from '../session/events/events'

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

        const roomId: SessionId = new SessionId(roomName)
        const TIMEOUT = 5_000

        const room: Session = new SessionImpl(roomId)
        this.rooms.add(room)
        room.registerEventHandlers()

        setTimeout(() => {
          const room: Session | undefined = this.rooms.find(roomId)
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
        const roomId: SessionId = new SessionId(command.sessionName)
        const room: Session | undefined = this.rooms.find(roomId)

        // Resolve the Promise if the room is already existing, reject otherwise
        if (room) {
          room.eventBus().publish(new UserJoinedEvent(user, command.notifications))
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
      const roomId: SessionId = new SessionId(command.sessionName)
      const user: User = getUserFromToken(command.token)
      const room: Session | undefined = this.rooms.find(roomId)

      if (room) {
        room.eventBus().publish(new UserLeftSessionEvent(user, command.notifications))
        this.removeRoomWhenAllUserLeft(roomId)
      }
      resolve()
    })
  }

  private removeRoomWhenAllUserLeft(roomId: SessionId): void {
    const roomEntry: SessionEntry | undefined = this.rooms.find(roomId)?.value
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
        const room: Session | undefined = this.rooms.find(new SessionId(command.sessionName))
        const textMessage: TextMessage = new TextMessage(user, command.message)
        if (room) {
          room.eventBus().publish(new MessageSentEvent(textMessage, command.notifications))
        }
        resolve()
      } else {
        reject()
      }
    })
  }

  async handlePlayVideoCommand(command: PlayVideoCommand): Promise<void> {
    return new Promise((resolve) => {
      const room: Session | undefined = this.rooms.find(new SessionId(command.sessionName))
      if (room) {
        room.eventBus().publish(new VideoPlayedEvent(command.timestamp, command.notifications))
      }
      resolve()
    })
  }

  async handleStopVideoCommand(command: StopVideoCommand): Promise<void> {
    return new Promise((resolve) => {
      const room: Session | undefined = this.rooms.find(new SessionId(command.sessionName))
      if (room) {
        room.eventBus().publish(new VideoStoppedEvent(command.timestamp, command.notifications))
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
