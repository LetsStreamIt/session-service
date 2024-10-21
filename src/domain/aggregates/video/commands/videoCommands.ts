import { CommandType, SessionCommand } from '../../../command/command'
import { SessionReactions } from '../../../reactions/sessionReactions'

export class PlayVideoCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  timestamp: number
  sessionReactions: SessionReactions

  constructor(
    token: string,
    sessionName: string,
    timestamp: number,
    sessionReactions: SessionReactions
  ) {
    this.type = CommandType.PLAY_VIDEO
    this.token = token
    this.sessionName = sessionName
    this.timestamp = timestamp
    this.sessionReactions = sessionReactions
  }
}

export class StopVideoCommand implements SessionCommand {
  type: CommandType
  token: string
  sessionName: string
  timestamp: number
  sessionReactions: SessionReactions

  constructor(
    token: string,
    sessionName: string,
    timestamp: number,
    sessionReactions: SessionReactions
  ) {
    this.type = CommandType.STOP_VIDEO
    this.token = token
    this.sessionName = sessionName
    this.timestamp = timestamp
    this.sessionReactions = sessionReactions
  }
}
