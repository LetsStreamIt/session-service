import { CommandType, ISessionCommand } from '../../../command/command'
import { ISessionReactions } from '../../../reactions/sessionReactions'

/**
 * Create Session Command
 */
export class CreateSessionCommand implements ISessionCommand {
  type: CommandType
  token: string
  videoUrl: string

  constructor(token: string, videoUrl: string) {
    this.type = CommandType.CREATE_SESSION
    this.token = token
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
  token: string
  sessionName: string
  sessionReactions: ISessionReactions

  constructor(token: string, sessionName: string, sessionReactions: ISessionReactions) {
    this.type = CommandType.JOIN_SESSION
    this.token = token
    this.sessionName = sessionName
    this.sessionReactions = sessionReactions
  }
}

/**
 * Leave Session Command
 */
export class LeaveSessionCommand implements ISessionCommand {
  type: CommandType
  token: string
  sessionName: string
  sessionReactions: ISessionReactions

  constructor(token: string, sessionName: string, sessionReactions: ISessionReactions) {
    this.type = CommandType.LEAVE_SESSION
    this.token = token
    this.sessionName = sessionName
    this.sessionReactions = sessionReactions
  }
}
