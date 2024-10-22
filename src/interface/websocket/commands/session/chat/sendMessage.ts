import { ISessionService } from '../../../../../application/sessionService/sessionService'
import { SendMessageCommand } from '../../../../../domain/aggregates/chat/commands/chatCommands'
import { SendMessageResponse } from '../../../../../domain/command/response'
import { ISessionReactions } from '../../../../../domain/reactions/sessionReactions'
import { User } from '../../../../../domain/user'

/**
 * Receives Send message commands.
 * Sends an ack back to the client, specified by the Session Service.
 * @param user User
 * @param sessionName Session name
 * @param sessionService Session Service
 * @param sessionReactions Session Reactions
 * @returns
 */
export function recvSendMessageCommand(
  user: User,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
): (message: any, ack: any) => void {
  return (data, ack) => {
    const { message } = data
    sessionService
      .handleSendMessageCommand(
        new SendMessageCommand(user, sessionName, message, sessionReactions)
      )
      .then((sendMessageResponse: SendMessageResponse) => ack(sendMessageResponse))
  }
}
