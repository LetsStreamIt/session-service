import { SessionNotifications } from '../../../notifications/sessionNotifications'
import {
  PlayVideoCommand,
  StopVideoCommand
} from '../../../../application/session/aggregates/video/commands/videoCommands'
import { SessionCommandHandlers } from '../../../../application/session/aggregates/session/commands/sessionCommandHandlers'
import { PlayVideoResponse, ResponseStatus, StopVideoResponse } from '../../ack/ack'

/**
 * Play video command
 * @param io
 * @param token
 * @param room
 * @param commandHandlers
 * @param notifications
 * @returns
 */
export function recvPlayVideoCommand(
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { timestamp } = data

    commandHandlers
      .handlePlayVideoCommand(new PlayVideoCommand(token, room, timestamp, notifications))
      .then(() => ack(new PlayVideoResponse(ResponseStatus.SUCCESS)))
      .catch(() => ack(new PlayVideoResponse(ResponseStatus.FAILURE)))
  }
}

/**
 * Stop video command
 * @param io
 * @param token
 * @param room
 * @param commandHandlers
 * @param notifications
 * @returns
 */
export function recvStopVideoCommand(
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { timestamp } = data

    commandHandlers
      .handleStopVideoCommand(new StopVideoCommand(token, room, timestamp, notifications))
      .then((stopVideoResponse: StopVideoResponse) => ack(stopVideoResponse))
  }
}
