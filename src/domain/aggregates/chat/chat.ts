import { TextMessage, NotificationMessage, JoinNotification } from './message'
import { IEventBus } from '../../common/event/eventBus'
import { EventType } from '../../common/event/event'
import { UserJoinedSessionEvent, UserLeftSessionEvent } from '../session/events/sessionEvents'
import { MessageSentEvent } from './events/chatEvents'

/**
 * Chat Aggregate.
 */
export interface IChat {
  /**
   * Registers Event Handlers for Events emitted by the Session Service.
   */
  registerEventHandlers(): void
}

export class Chat implements IChat {
  private readonly messages: TextMessage[]
  private readonly eventBus: IEventBus

  constructor(eventBus: IEventBus) {
    this.messages = []
    this.eventBus = eventBus
  }

  registerEventHandlers() {
    this.eventBus.subscribe(EventType.UserJoinedSession, this.handleUserJoinedEvent)
    this.eventBus.subscribe(EventType.UserLeftSession, this.handleUserLeftEvent)
    this.eventBus.subscribe(EventType.MessageSent, this.handleMessageSentEvent)
  }

  /**
   * User Joined Event Handler.
   * - Sends a message to the Session Chat specifying the user join
   * - Updates the client Chat with the current messages sent so far in the Session
   * @param event User Joined Event
   * @returns Promise resolved when all messages are emitted
   */
  private handleUserJoinedEvent: (event: UserJoinedSessionEvent) => Promise<void> = (
    event: UserJoinedSessionEvent
  ) => {
    return new Promise((resolve) => {
      event.getSessionReactions.getChatReactions.emitNotificationToSession(
        new NotificationMessage(event.getUser, JoinNotification.JOIN_SESSION)
      )
      event.getSessionReactions.getChatReactions.emitTextMessagesToClient(...this.messages)
      resolve()
    })
  }

  /**
   * User Left Event Handler.
   * Sends a message to the Session Chat specifying the user exit
   * @param event User Left Session Event
   * @returns Promise resolved when all messages are emitted
   */
  private handleUserLeftEvent: (event: UserLeftSessionEvent) => Promise<void> = (
    event: UserLeftSessionEvent
  ) => {
    return new Promise((resolve) => {
      event.getSessionReactions.getChatReactions.emitNotificationToSession(
        new NotificationMessage(event.getUser, JoinNotification.LEAVE_SESSION)
      )
      resolve()
    })
  }

  /**
   * Message Sent Event Handler.
   * Sends a message to all Users connected in the Session.
   * @param event Message Sent Event
   * @returns Promise completed when messages are emitted to the Session
   */
  private handleMessageSentEvent: (event: MessageSentEvent) => Promise<void> = (
    event: MessageSentEvent
  ) => {
    return new Promise((resolve) => {
      this.messages.push(event.getTextMessage)
      event.getSessionReactions.getChatReactions.emitTextMessagesToSession(event.getTextMessage)
      resolve()
    })
  }
}
