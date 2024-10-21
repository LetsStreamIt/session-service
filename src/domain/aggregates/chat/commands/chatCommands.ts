import { CommandType, ISessionCommand } from '../../../command/command'
import { ISessionReactions } from '../../../reactions/sessionReactions'

/**
 * Send Message Command.
 */
export class SendMessageCommand implements ISessionCommand {
  type: CommandType
  token: string
  sessionName: string
  message: string
  sessionReactions: ISessionReactions

  constructor(
    token: string,
    sessionName: string,
    message: string,
    sessionReactions: ISessionReactions
  ) {
    this.type = CommandType.SEND_MSG
    this.token = token
    this.sessionName = sessionName
    this.message = message
    this.sessionReactions = sessionReactions
  }
}
