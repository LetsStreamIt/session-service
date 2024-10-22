import { CommandType, ISessionCommand } from '../../../command/command'
import { ISessionReactions } from '../../../reactions/sessionReactions'
import { User } from '../../../user'

/**
 * Play Video Command
 */
export class PlayVideoCommand implements ISessionCommand {
  type: CommandType
  user: User
  sessionName: string
  timestamp: number
  sessionReactions: ISessionReactions

  constructor(
    user: User,
    sessionName: string,
    timestamp: number,
    sessionReactions: ISessionReactions
  ) {
    this.type = CommandType.PLAY_VIDEO
    this.user = user
    this.sessionName = sessionName
    this.timestamp = timestamp
    this.sessionReactions = sessionReactions
  }
}

/**
 * Stop Video Command
 */
export class StopVideoCommand implements ISessionCommand {
  type: CommandType
  user: User
  sessionName: string
  timestamp: number
  sessionReactions: ISessionReactions

  constructor(
    user: User,
    sessionName: string,
    timestamp: number,
    sessionReactions: ISessionReactions
  ) {
    this.type = CommandType.STOP_VIDEO
    this.user = user
    this.sessionName = sessionName
    this.timestamp = timestamp
    this.sessionReactions = sessionReactions
  }
}
