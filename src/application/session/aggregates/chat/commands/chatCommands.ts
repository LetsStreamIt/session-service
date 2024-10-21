import { CommandType, SessionCommand } from '../../../../../domain/command/command'
import { SessionReactions } from '../../../../../domain/reactions/sessionReactions'

export class SendMessageCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  message: string
  sessionReactions: SessionReactions

  constructor(
    token: string,
    sessionName: string,
    message: string,
    sessionReactions: SessionReactions
  ) {
    this.type = CommandType.SEND_MSG
    this.token = token
    this.sessionName = sessionName
    this.message = message
    this.sessionReactions = sessionReactions
  }
}
