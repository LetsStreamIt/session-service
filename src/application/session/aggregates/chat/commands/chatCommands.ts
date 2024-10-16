import { CommandType, SessionCommand } from '../../../../command/command'
import { SessionNotifications } from '../../../../../presentation/notifications/sessionNotifications'

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
