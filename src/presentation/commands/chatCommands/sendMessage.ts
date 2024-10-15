import { Server } from 'socket.io'
import { Ack } from '../../../application/message'
import { SessionCommandHandlers } from '../../../application/commandHandlers/sessionCommandHandlers'
import { SessionNotifications } from '../../notifications/sessionNotifications'

/**
 * Send message command.
 * Sends a message to the room specified as parameter.
 * @param io
 * @param token
 * @param room
 * @param roomController
 * @returns
 */
export function recvSendMessageCommand(
  io: Server,
  token: string,
  room: string,
  roomController: SessionCommandHandlers,
  roomReactions: SessionNotifications
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { message } = data
    roomController
      .handleSendMessageCommand(token, message, room, roomReactions)
      .then(() => ack(Ack.OK))
      .catch(() => ack(Ack.FAILURE))
  }
}
