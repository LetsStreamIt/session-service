import { TextMessage, NotificationMessage, Notification } from '../../message'
import { EventBus } from '../../../event/eventBus'
import { EventType } from '../../../event/event'
import { UserJoinedEvent, UserLeftSessionEvent } from '../session/events/sessionEvents'
import { MessageSentEvent } from './events/chatEvents'

export interface Chat {
  registerEventHandlers(): void
}

export class ChatImpl implements Chat {
  private readonly messages: TextMessage[]
  private readonly eventBus: EventBus

  constructor(eventBus: EventBus) {
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
      event.notifications.chatReactions.sendNotificationToSession(
        new NotificationMessage(event.user, Notification.JOIN_SESSION)
      )
      event.notifications.chatReactions.emitTextMessagesToClient(...this.messages)
      resolve()
    })
  }

  private handleUserLeftEvent: (event: UserLeftSessionEvent) => Promise<void> = (
    event: UserJoinedEvent
  ) => {
    return new Promise((resolve) => {
      event.notifications.chatReactions.sendNotificationToSession(
        new NotificationMessage(event.user, Notification.LEAVE_SESSION)
      )
      resolve()
    })
  }

  private handleMessageSentEvent: (event: MessageSentEvent) => Promise<void> = (
    event: MessageSentEvent
  ) => {
    return new Promise((resolve) => {
      this.messages.push(event.textMessage)
      event.notifications.chatReactions.sendTextMessagesToSession(event.textMessage)
      resolve()
    })
  }
}
