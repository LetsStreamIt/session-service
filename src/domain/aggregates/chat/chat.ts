import { TextMessage, NotificationMessage, JoinNotification } from './message'
import { IEventBus } from '../../event/eventBus'
import { EventType } from '../../event/event'
import { UserJoinedEvent, UserLeftSessionEvent } from '../session/events/sessionEvents'
import { MessageSentEvent } from './events/chatEvents'

export interface IChat {
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

  private handleUserJoinedEvent: (event: UserJoinedEvent) => Promise<void> = (
    event: UserJoinedEvent
  ) => {
    return new Promise((resolve) => {
      event.sessionReactions.getChatReactions.sendNotificationToSession(
        new NotificationMessage(event.user, JoinNotification.JOIN_SESSION)
      )
      event.sessionReactions.getChatReactions.emitTextMessagesToClient(...this.messages)
      resolve()
    })
  }

  private handleUserLeftEvent: (event: UserLeftSessionEvent) => Promise<void> = (
    event: UserJoinedEvent
  ) => {
    return new Promise((resolve) => {
      event.sessionReactions.getChatReactions.sendNotificationToSession(
        new NotificationMessage(event.user, JoinNotification.LEAVE_SESSION)
      )
      resolve()
    })
  }

  private handleMessageSentEvent: (event: MessageSentEvent) => Promise<void> = (
    event: MessageSentEvent
  ) => {
    return new Promise((resolve) => {
      this.messages.push(event.textMessage)
      event.sessionReactions.getChatReactions.sendTextMessagesToSession(event.textMessage)
      resolve()
    })
  }
}
