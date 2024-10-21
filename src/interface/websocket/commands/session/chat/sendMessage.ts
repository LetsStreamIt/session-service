import { ISessionService } from '../../../../../application/sessionService/sessionService'
import { SendMessageCommand } from '../../../../../domain/aggregates/chat/commands/chatCommands'
import { SendMessageResponse } from '../../../../../domain/command/response'
import { ISessionReactions } from '../../../../../domain/reactions/sessionReactions'

/**
 * Receives Send message commands.
 * Sends an ack back to the client, specified by the Session Service.
 * @param io Socket IO Server
 * @param token access token
 * @param sessionName Session name
 * @param sessionService Session Service
 * @returns
 */
export function recvSendMessageCommand(
  token: string,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { message } = data
    sessionService
      .handleSendMessageCommand(
        new SendMessageCommand(token, sessionName, message, sessionReactions)
      )
      .then((sendMessageResponse: SendMessageResponse) => ack(sendMessageResponse))
  }
}
