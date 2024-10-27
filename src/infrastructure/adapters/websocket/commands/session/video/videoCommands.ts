import { Socket } from 'socket.io'
import { ISessionService } from '../../../../../../application/sessionService'
import {
  PlayVideoCommand,
  StopVideoCommand
} from '../../../../../../domain/aggregates/video/commands/videoCommands'
import { CommandType } from '../../../../../../domain/common/command/command'
import {
  PlayVideoResponse,
  StopVideoResponse
} from '../../../../../../domain/common/command/response'
import { ISessionReactions } from '../../../../../../domain/common/reactions/sessionReactions'
import { User } from '../../../../../../domain/common/user'

/**
 * Accepts Play Video commands.
 * Sends an ack back to the client, specifying a Response dictated by the Session Service.
 * @param socket Socket IO socket
 * @param user access user
 * @param sessionName Session name
 * @param sessionService Session Service
 * @param sessionReactions Session Reactions
 * @returns
 */
export function acceptPlayVideoCommand(
  socket: Socket,
  user: User,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
): void {
  socket.on(CommandType.PLAY_VIDEO, (data, ack) => {
    const { timestamp } = data
    sessionService
      .handlePlayVideoCommand(new PlayVideoCommand(user, sessionName, timestamp, sessionReactions))
      .then((playVideoResponse: PlayVideoResponse) => ack(playVideoResponse))
  })
}

/**
 * Accept Stop Video commands.
 * Sends an ack back to the client, specifying a Response dictated by the Session Service.
 * @param socket Socket IO socket
 * @param user access user
 * @param sessionName Session name
 * @param sessionService Session Service
 * @param sessionReactions Session Reactions
 */
export function acceptStopVideoCommand(
  socket: Socket,
  user: User,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
) {
  socket.on(CommandType.STOP_VIDEO, (data, ack) => {
    const { timestamp } = data
    sessionService
      .handleStopVideoCommand(new StopVideoCommand(user, sessionName, timestamp, sessionReactions))
      .then((stopVideoResponse: StopVideoResponse) => ack(stopVideoResponse))
  })
}
