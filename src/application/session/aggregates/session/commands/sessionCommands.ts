import { CommandType, SessionCommand } from '../../../../../domain/command/command'
import { SessionReactions } from '../../../../../domain/reactions/sessionReactions'

export class CreateSessionCommand implements SessionCommand {
  type: CommandType
  token: string
  videoUrl: string

  constructor(token: string, videoUrl: string) {
    this.type = CommandType.CREATE_SESSION
    this.token = token
    this.videoUrl = videoUrl
  }
}

export class UserTokenCommand implements SessionCommand {
  type: CommandType
  token: string

  constructor(token: string) {
    this.type = CommandType.USER_TOKEN
    this.token = token
  }
}

export class JoinSessionCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  sessionReactions: SessionReactions

  constructor(token: string, sessionName: string, sessionReactions: SessionReactions) {
    this.type = CommandType.JOIN_SESSION
    this.token = token
    this.sessionName = sessionName
    this.sessionReactions = sessionReactions
  }
}

export class LeaveSessionCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  sessionReactions: SessionReactions

  constructor(token: string, sessionName: string, sessionReactions: SessionReactions) {
    this.type = CommandType.LEAVE_SESSION
    this.token = token
    this.sessionName = sessionName
    this.sessionReactions = sessionReactions
  }
}
