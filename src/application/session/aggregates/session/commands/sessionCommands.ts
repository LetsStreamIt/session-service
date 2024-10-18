import { CommandType, SessionCommand } from '../../../../command/command'
import { SessionNotifications } from '../../../../../presentation/notifications/sessionNotifications'

export class CreateSessionCommand implements SessionCommand {
  type: CommandType
  token: string
  videoUrl: string

  constructor(token: string, videoUrl: string) {
    this.type = CommandType.CREATE_SESSION
    this.token = token
    this.videoUrl = videoUrl
  }
}

export class UserTokenCommand implements SessionCommand {
  type: CommandType
  token: string

  constructor(token: string) {
    this.type = CommandType.USER_TOKEN
    this.token = token
  }
}

export class JoinSessionCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  notifications: SessionNotifications

  constructor(token: string, sessionName: string, notifications: SessionNotifications) {
    this.type = CommandType.JOIN_SESSION
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
    this.type = CommandType.LEAVE_SESSION
    this.token = token
    this.sessionName = sessionName
    this.notifications = notifications
  }
}
