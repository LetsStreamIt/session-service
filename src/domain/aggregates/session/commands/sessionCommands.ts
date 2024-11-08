import { CommandType, ISessionCommand } from '../../../common/command/command'
import { ISessionReactions } from '../../../common/reactions/sessionReactions'
import { User } from '../../../common/user'
import { IProfileServiceUtils, IAuthServiceUtils } from '../../../utils/serviceUtils'

export class CreateSessionCommandContent {
  readonly user: User
  readonly videoUrl: string

  constructor(user: User, videoUrl: string) {
    this.user = user
    this.videoUrl = videoUrl
  }
}

/**
 * Create Session Command
 */
export class CreateSessionCommand implements ISessionCommand<CreateSessionCommandContent> {
  readonly type: CommandType
  readonly content: CreateSessionCommandContent

  constructor(user: User, videoUrl: string) {
    this.type = CommandType.CREATE_SESSION
    this.content = new CreateSessionCommandContent(user, videoUrl)
  }
}

export class UserTokenCommandContent {
  readonly token: string
  readonly profileServiceUtils: IProfileServiceUtils
  readonly authServiceUtils: IAuthServiceUtils

  constructor(
    token: string,
    profileServiceUtils: IProfileServiceUtils,
    authServiceUtils: IAuthServiceUtils
  ) {
    this.token = token
    this.profileServiceUtils = profileServiceUtils
    this.authServiceUtils = authServiceUtils
  }
}

/**
 * User Token Command
 */
export class UserTokenCommand implements ISessionCommand<UserTokenCommandContent> {
  readonly type: CommandType
  readonly content: UserTokenCommandContent

  constructor(
    token: string,
    profileServiceUtils: IProfileServiceUtils,
    authServiceUtils: IAuthServiceUtils
  ) {
    this.type = CommandType.USER_TOKEN
    this.content = new UserTokenCommandContent(token, profileServiceUtils, authServiceUtils)
  }
}

export class SessionCommandContent {
  readonly user: User
  readonly sessionName: string
  readonly sessionReactions: ISessionReactions

  constructor(user: User, sessionName: string, sessionReactions: ISessionReactions) {
    this.user = user
    this.sessionName = sessionName
    this.sessionReactions = sessionReactions
  }
}

/**
 * Join Session Command
 */
export class JoinSessionCommand implements ISessionCommand<SessionCommandContent> {
  readonly type: CommandType
  readonly content: SessionCommandContent

  constructor(user: User, sessionName: string, sessionReactions: ISessionReactions) {
    this.type = CommandType.JOIN_SESSION
    this.content = new SessionCommandContent(user, sessionName, sessionReactions)
  }
}

/**
 * Leave Session Command
 */
export class LeaveSessionCommand implements ISessionCommand<SessionCommandContent> {
  readonly type: CommandType
  readonly content: SessionCommandContent

  constructor(user: User, sessionName: string, sessionReactions: ISessionReactions) {
    this.type = CommandType.LEAVE_SESSION
    this.content = new SessionCommandContent(user, sessionName, sessionReactions)
  }
}
