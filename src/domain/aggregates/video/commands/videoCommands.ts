import { CommandType, ISessionCommand } from '../../../command/command'
import { ISessionReactions } from '../../../reactions/sessionReactions'

/**
 * Play Video Command
 */
export class PlayVideoCommand implements ISessionCommand {
  type: CommandType
  token: string
  sessionName: string
  timestamp: number
  sessionReactions: ISessionReactions

  constructor(
    token: string,
    sessionName: string,
    timestamp: number,
    sessionReactions: ISessionReactions
  ) {
    this.type = CommandType.PLAY_VIDEO
    this.token = token
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
  token: string
  sessionName: string
  timestamp: number
  sessionReactions: ISessionReactions

  constructor(
    token: string,
    sessionName: string,
    timestamp: number,
    sessionReactions: ISessionReactions
  ) {
    this.type = CommandType.STOP_VIDEO
    this.token = token
    this.sessionName = sessionName
    this.timestamp = timestamp
    this.sessionReactions = sessionReactions
  }
}
