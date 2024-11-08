import { CommandType, ISessionCommand } from '../../../common/command/command'
import { ISessionReactions } from '../../../common/reactions/sessionReactions'
import { User } from '../../../common/user'

class VideoCommandContent {
  readonly user: User
  readonly sessionName: string
  readonly timestamp: number
  readonly sessionReactions: ISessionReactions

  constructor(
    user: User,
    sessionName: string,
    timestamp: number,
    sessionReactions: ISessionReactions
  ) {
    this.user = user
    this.sessionName = sessionName
    this.timestamp = timestamp
    this.sessionReactions = sessionReactions
  }
}

/**
 * Play Video Command
 */
export class PlayVideoCommand implements ISessionCommand<VideoCommandContent> {
  readonly type: CommandType
  readonly content: VideoCommandContent

  constructor(
    user: User,
    sessionName: string,
    timestamp: number,
    sessionReactions: ISessionReactions
  ) {
    this.type = CommandType.PLAY_VIDEO
    this.content = new VideoCommandContent(user, sessionName, timestamp, sessionReactions)
  }
}

/**
 * Stop Video Command
 */
export class StopVideoCommand implements ISessionCommand<VideoCommandContent> {
  readonly type: CommandType
  readonly content: VideoCommandContent

  constructor(
    user: User,
    sessionName: string,
    timestamp: number,
    sessionReactions: ISessionReactions
  ) {
    this.type = CommandType.STOP_VIDEO
    this.content = new VideoCommandContent(user, sessionName, timestamp, sessionReactions)
  }
}
