import { SessionService } from '../../../../../application/sessionService/sessionService'
import {
  PlayVideoCommand,
  StopVideoCommand
} from '../../../../../domain/aggregates/video/commands/videoCommands'
import {
  PlayVideoResponse,
  ResponseStatus,
  StopVideoResponse
} from '../../../../../domain/command/response'
import { ISessionReactions } from '../../../../../domain/reactions/sessionReactions'

/**
 * Play video command
 * @param io
 * @param token
 * @param sessionName
 * @param commandHandlers
 * @param sessionReactions
 * @returns
 */
export function recvPlayVideoCommand(
  token: string,
  sessionName: string,
  commandHandlers: SessionService,
  sessionReactions: ISessionReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { timestamp } = data

    commandHandlers
      .handlePlayVideoCommand(new PlayVideoCommand(token, sessionName, timestamp, sessionReactions))
      .then(() => ack(new PlayVideoResponse(ResponseStatus.SUCCESS)))
      .catch(() => ack(new PlayVideoResponse(ResponseStatus.FAILURE)))
  }
}

/**
 * Stop video command
 * @param io
 * @param token
 * @param sessionName
 * @param commandHandlers
 * @param sessionReactions
 * @returns
 */
export function recvStopVideoCommand(
  token: string,
  sessionName: string,
  commandHandlers: SessionService,
  sessionReactions: ISessionReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { timestamp } = data

    commandHandlers
      .handleStopVideoCommand(new StopVideoCommand(token, sessionName, timestamp, sessionReactions))
      .then((stopVideoResponse: StopVideoResponse) => ack(stopVideoResponse))
  }
}
