import {
  SendMessageCommand,
  SendMessageCommandContent
} from '../../domain/aggregates/chat/commands/chatCommands'
import { MessageSentEvent } from '../../domain/aggregates/chat/events/chatEvents'
import { TextMessage } from '../../domain/aggregates/chat/message'
import { Session, SessionId, SessionRepository } from '../../domain/aggregates/session/session'
import { SendMessageResponse, ResponseStatus } from '../../domain/common/command/response'

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
    const content: SendMessageCommandContent = command.content
    if (content.message !== '') {
      const session: Session | undefined = sessions.find(new SessionId(content.sessionName))
      const textMessage: TextMessage = new TextMessage(content.user, content.message)
      if (session) {
        session.eventBus.publish(new MessageSentEvent(textMessage, content.sessionReactions))
      }
      resolve(new SendMessageResponse(ResponseStatus.SUCCESS))
    } else {
      resolve(new SendMessageResponse(ResponseStatus.FAILURE))
    }
  })
}
