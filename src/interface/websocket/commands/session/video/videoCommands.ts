import { ISessionService } from '../../../../../application/sessionService/sessionService'
import {
  PlayVideoCommand,
  StopVideoCommand
} from '../../../../../domain/aggregates/video/commands/videoCommands'
import { PlayVideoResponse, StopVideoResponse } from '../../../../../domain/command/response'
import { ISessionReactions } from '../../../../../domain/reactions/sessionReactions'

/**
 * Receives Play Video commands.
 * Sends an ack back to the client, specifying a Response dictated by the Session Service.
 * @param token access token
 * @param sessionName Session name
 * @param sessionService Session Service
 * @param sessionReactions Session Reactions
 * @returns
 */
export function recvPlayVideoCommand(
  token: string,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { timestamp } = data

    sessionService
      .handlePlayVideoCommand(new PlayVideoCommand(token, sessionName, timestamp, sessionReactions))
      .then((playVideoResponse: PlayVideoResponse) => ack(playVideoResponse))
  }
}

/**
 * Receives Stop Video commands.
 * Sends an ack back to the client, specifying a Response dictated by the Session Service.
 * @param token access token
 * @param sessionName Session name
 * @param sessionService Session Service
 * @param sessionReactions Session Reactions
 * @returns
 */
export function recvStopVideoCommand(
  token: string,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { timestamp } = data

    sessionService
      .handleStopVideoCommand(new StopVideoCommand(token, sessionName, timestamp, sessionReactions))
      .then((stopVideoResponse: StopVideoResponse) => ack(stopVideoResponse))
  }
}
