import { SessionService } from '../../../../../application/sessionService/sessionService'
import { SendMessageCommand } from '../../../../../domain/aggregates/chat/commands/chatCommands'
import { SendMessageResponse } from '../../../../../domain/command/response'
import { ISessionReactions } from '../../../../../domain/reactions/sessionReactions'

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
  commandHandlers: SessionService,
  sessionReactions: ISessionReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { message } = data
    commandHandlers
      .handleSendMessageCommand(
        new SendMessageCommand(token, sessionName, message, sessionReactions)
      )
      .then((sendMessageResponse: SendMessageResponse) => ack(sendMessageResponse))
  }
}
