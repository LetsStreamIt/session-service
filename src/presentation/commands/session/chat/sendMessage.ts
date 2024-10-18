import { SessionNotifications } from '../../../notifications/sessionNotifications'
import { SendMessageCommand } from '../../../../application/session/aggregates/chat/commands/chatCommands'
import { SessionCommandHandlers } from '../../../../application/session/aggregates/session/commands/sessionCommandHandlers'
import { SendMessageResponse } from '../../ack/ack'

/**
 * Send message command.
 * Sends a message to the sessionName specified as parameter.
 * @param io
 * @param token
 * @param sessionName
 * @param commandHandlers
 * @returns
 */
export function recvSendMessageCommand(
  token: string,
  sessionName: string,
  commandHandlers: SessionCommandHandlers,
  notifications: SessionNotifications
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { message } = data
    commandHandlers
      .handleSendMessageCommand(new SendMessageCommand(token, sessionName, message, notifications))
      .then((sendMessageResponse: SendMessageResponse) => ack(sendMessageResponse))
  }
}
