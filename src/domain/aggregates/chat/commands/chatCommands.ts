import { CommandType, ISessionCommand } from '../../../common/command/command'
import { ISessionReactions } from '../../../common/reactions/sessionReactions'
import { User } from '../../../common/user'

export class SendMessageCommandContent {
  readonly user: User
  readonly sessionName: string
  readonly message: string
  readonly sessionReactions: ISessionReactions

  constructor(
    user: User,
    sessionName: string,
    message: string,
    sessionReactions: ISessionReactions
  ) {
    this.user = user
    this.sessionName = sessionName
    this.message = message
    this.sessionReactions = sessionReactions
  }
}

/**
 * Send Message Command.
 */
export class SendMessageCommand implements ISessionCommand<SendMessageCommandContent> {
  readonly type: CommandType
  readonly content: SendMessageCommandContent

  constructor(
    user: User,
    sessionName: string,
    message: string,
    sessionReactions: ISessionReactions
  ) {
    this.type = CommandType.SEND_MSG
    this.content = new SendMessageCommandContent(user, sessionName, message, sessionReactions)
  }
}
