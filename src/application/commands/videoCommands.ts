import { CommandType } from './commandType'
import { SessionNotifications } from '../../presentation/notifications/sessionNotifications'
import { SessionCommand } from './sessionCommands'

export class PlayVideoCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  timestamp: number
  notifications: SessionNotifications

  constructor(
    token: string,
    sessionName: string,
    timestamp: number,
    notifications: SessionNotifications
  ) {
    this.type = CommandType.PLAY_VIDEO
    this.token = token
    this.sessionName = sessionName
    this.timestamp = timestamp
    this.notifications = notifications
  }
}

export class StopVideoCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  timestamp: number
  notifications: SessionNotifications

  constructor(
    token: string,
    sessionName: string,
    timestamp: number,
    notifications: SessionNotifications
  ) {
    this.type = CommandType.STOP_VIDEO
    this.token = token
    this.sessionName = sessionName
    this.timestamp = timestamp
    this.notifications = notifications
  }
}
