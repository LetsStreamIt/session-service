import { Server } from 'socket.io'
import { Ack } from '../../../application/message'
import { SessionCommandHandlers } from '../../../application/commands/sessionCommandHandlers'
import { SessionNotifications } from '../../notifications/sessionNotifications'
import { PlayVideoCommand, StopVideoCommand } from '../../../application/commands/videoCommands'

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
  io: Server,
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { timestamp } = data

    commandHandlers
      .handlePlayVideoCommand(new PlayVideoCommand(token, room, timestamp, notifications))
      .then(() => ack(Ack.OK))
      .catch(() => ack(Ack.FAILURE))
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
  io: Server,
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { timestamp } = data

    commandHandlers
      .handleStopVideoCommand(new StopVideoCommand(token, room, timestamp, notifications))
      .then(() => ack(Ack.OK))
      .catch(() => ack(Ack.FAILURE))
  }
}
