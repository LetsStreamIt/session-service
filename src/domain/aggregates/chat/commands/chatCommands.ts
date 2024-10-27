import { CommandType, ISessionCommand } from '../../../common/command/command'
import { ISessionReactions } from '../../../common/reactions/sessionReactions'
import { User } from '../../../common/user'

/**
 * Send Message Command.
 */
export class SendMessageCommand implements ISessionCommand {
  type: CommandType
  user: User
  sessionName: string
  message: string
  sessionReactions: ISessionReactions

  constructor(
    user: User,
    sessionName: string,
    message: string,
    sessionReactions: ISessionReactions
  ) {
    this.type = CommandType.SEND_MSG
    this.user = user
    this.sessionName = sessionName
    this.message = message
    this.sessionReactions = sessionReactions
  }
}
