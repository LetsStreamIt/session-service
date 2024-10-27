import { CommandType, ISessionCommand } from '../../../common/command/command'
import { ISessionReactions } from '../../../common/reactions/sessionReactions'
import { User } from '../../../common/user'
import { IProfileServiceUtils, IAuthServiceUtils } from '../../../utils/profileServiceUtils'

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
  profileServiceUtils: IProfileServiceUtils
  authServiceUtils: IAuthServiceUtils

  constructor(
    token: string,
    profileServiceUtils: IProfileServiceUtils,
    authServiceUtils: IAuthServiceUtils
  ) {
    this.type = CommandType.USER_TOKEN
    this.token = token
    this.profileServiceUtils = profileServiceUtils
    this.authServiceUtils = authServiceUtils
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
