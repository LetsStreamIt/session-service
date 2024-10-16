import { CommandType, SessionCommand } from '../../../../command/command'
import { SessionNotifications } from '../../../../../presentation/notifications/sessionNotifications'

export class CreateSessionCommand implements SessionCommand {
  type: CommandType
  token: string
  videoId: string

  constructor(token: string, videoId: string) {
    this.type = CommandType.CREATE_ROOM
    this.token = token
    this.videoId = videoId
  }
}

export class JoinSessionCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  notifications: SessionNotifications

  constructor(token: string, sessionName: string, notifications: SessionNotifications) {
    this.type = CommandType.JOIN_ROOM
    this.token = token
    this.sessionName = sessionName
    this.notifications = notifications
  }
}

export class LeaveSessionCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  notifications: SessionNotifications

  constructor(token: string, sessionName: string, notifications: SessionNotifications) {
    this.type = CommandType.LEAVE_ROOM
    this.token = token
    this.sessionName = sessionName
    this.notifications = notifications
  }
}
