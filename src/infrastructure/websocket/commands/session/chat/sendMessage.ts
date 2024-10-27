import { Socket } from 'socket.io'
import { ISessionService } from '../../../../../application/sessionService'
import { SendMessageCommand } from '../../../../../domain/aggregates/chat/commands/chatCommands'
import { CommandType } from '../../../../../domain/common/command/command'
import { SendMessageResponse } from '../../../../../domain/common/command/response'
import { ISessionReactions } from '../../../../../domain/common/reactions/sessionReactions'
import { User } from '../../../../../domain/common/user'

/**
 * Accept Send message commands.
 * Sends an ack back to the client, specified by the Session Service.
 * @param socket Socket IO socket
 * @param user User
 * @param sessionName Session name
 * @param sessionService Session Service
 * @param sessionReactions Session Reactions
 */
export function acceptSendMessageCommand(
  socket: Socket,
  user: User,
  sessionName: string,
  sessionService: ISessionService,
  sessionReactions: ISessionReactions
) {
  socket.on(CommandType.SEND_MSG, (data, ack) => {
    const { message } = data
    sessionService
      .handleSendMessageCommand(
        new SendMessageCommand(user, sessionName, message, sessionReactions)
      )
      .then((sendMessageResponse: SendMessageResponse) => ack(sendMessageResponse))
  })
}
