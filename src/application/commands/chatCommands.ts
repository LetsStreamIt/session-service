import { CommandType } from './commandType'
import { SessionNotifications } from '../../presentation/notifications/sessionNotifications'
import { SessionCommand } from './sessionCommands'

export class SendMessageCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  message: string
  notifications: SessionNotifications

  constructor(
    token: string,
    sessionName: string,
    message: string,
    notifications: SessionNotifications
  ) {
    this.type = CommandType.SEND_MSG
    this.token = token
    this.sessionName = sessionName
    this.message = message
    this.notifications = notifications
  }
}
