import { CommandType, SessionCommand } from '../../../command/command'
import { SessionReactions } from '../../../reactions/sessionReactions'

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
