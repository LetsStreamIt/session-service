import { CommandType, ISessionCommand } from '../../../command/command'
import { ISessionReactions } from '../../../reactions/sessionReactions'
import { User } from '../../../user'

/**
 * Create Session Command
 */
export class CreateSessionCommand implements ISessionCommand {
  type: CommandType
  user: User
  videoUrl: string

  constructor(user: User, videoUrl: string) {
    this.type = CommandType.CREATE_SESSION
    this.user = user
    this.videoUrl = videoUrl
  }
}

/**
 * User Token Command
 */
export class UserTokenCommand implements ISessionCommand {
  type: CommandType
  token: string

  constructor(token: string) {
    this.type = CommandType.USER_TOKEN
    this.token = token
  }
}

/**
 * Join Session Command
 */
export class JoinSessionCommand implements ISessionCommand {
  type: CommandType
  user: User
  sessionName: string
  sessionReactions: ISessionReactions

  constructor(user: User, sessionName: string, sessionReactions: ISessionReactions) {
    this.type = CommandType.JOIN_SESSION
    this.user = user
    this.sessionName = sessionName
    this.sessionReactions = sessionReactions
  }
}

/**
 * Leave Session Command
 */
export class LeaveSessionCommand implements ISessionCommand {
  type: CommandType
  user: User
  sessionName: string
  sessionReactions: ISessionReactions

  constructor(user: User, sessionName: string, sessionReactions: ISessionReactions) {
    this.type = CommandType.LEAVE_SESSION
    this.user = user
    this.sessionName = sessionName
    this.sessionReactions = sessionReactions
  }
}
