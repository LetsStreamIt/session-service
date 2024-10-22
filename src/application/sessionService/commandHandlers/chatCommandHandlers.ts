import { SendMessageCommand } from '../../../domain/aggregates/chat/commands/chatCommands'
import { MessageSentEvent } from '../../../domain/aggregates/chat/events/chatEvents'
import { TextMessage } from '../../../domain/aggregates/chat/message'
import { ISession, SessionId, SessionRepository } from '../../../domain/aggregates/session/session'
import { SendMessageResponse, ResponseStatus } from '../../../domain/command/response'

/**
 * Send Message Command Handler.
 * If the message is not empty, generates a MessageSentEvent.
 * @param sessions Session repository
 * @param command Send message command
 * @returns A Send Message Response to send back to the client specifying the success/failure
 */
export async function handleSendMessageCommand(
  sessions: SessionRepository,
  command: SendMessageCommand
): Promise<SendMessageResponse> {
  return new Promise((resolve) => {
    if (command.message !== '') {
      const session: ISession | undefined = sessions.find(new SessionId(command.sessionName))
      const textMessage: TextMessage = new TextMessage(command.user, command.message)
      if (session) {
        session.eventBus.publish(new MessageSentEvent(textMessage, command.sessionReactions))
      }
      resolve(new SendMessageResponse(ResponseStatus.SUCCESS))
    } else {
      resolve(new SendMessageResponse(ResponseStatus.FAILURE))
    }
  })
}
