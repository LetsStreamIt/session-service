import { Server } from 'socket.io'
import { Ack } from '../../../application/message'
import { SessionCommandHandlers } from '../../../application/commandHandlers/sessionCommandHandlers'
import { SessionNotifications } from '../../notifications/sessionNotifications'
import { SendMessageCommand } from '../../../application/commandHandlers/commands'

/**
 * Send message command.
 * Sends a message to the room specified as parameter.
 * @param io
 * @param token
 * @param room
 * @param commandHandlers
 * @returns
 */
export function recvSendMessageCommand(
  io: Server,
  token: string,
  room: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { message } = data
    commandHandlers
      .handleSendMessageCommand(new SendMessageCommand(token, room, message, notifications))
      .then(() => ack(Ack.OK))
      .catch(() => ack(Ack.FAILURE))
  }
}
