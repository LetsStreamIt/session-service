// import { SessionNotifications } from '../presentation/notifications/sessionNotifications'
// import { TextMessage } from './message'
// import { User } from './room/user'

// interface SessionEvent {
//   type: EventType
//   notifications: SessionNotifications
// }

// enum EventType {
//   SessionCreated,
//   UserJoinedSession,
//   UserLeftSession,
//   MessageSent,
//   VideoPlayed,
//   VideoStopped
// }

// class SessionCreatedEvent implements SessionEvent {
//   type: EventType
//   notifications: SessionNotifications
//   sessionName: string

//   constructor(sessionName: string, notifications: SessionNotifications) {
//     this.type = EventType.SessionCreated
//     this.sessionName = sessionName
//     this.notifications = notifications
//   }
// }

// class UserJoinedEvent implements SessionEvent {
//   type: EventType
//   notifications: SessionNotifications
//   user: User

//   constructor(user: User, notifications: SessionNotifications) {
//     this.type = EventType.UserJoinedSession
//     this.notifications = notifications
//     this.user = user
//   }
// }

// class UserLeftSessionEvent implements SessionEvent {
//   type: EventType
//   notifications: SessionNotifications
//   user: User

//   constructor(user: User, notifications: SessionNotifications) {
//     this.type = EventType.UserLeftSession
//     this.notifications = notifications
//     this.user = user
//   }
// }

// class VideoPlayedEvent implements SessionEvent {
//   type: EventType
//   notifications: SessionNotifications
//   timestamp: number

//   constructor(timestamp: number, notifications: SessionNotifications) {
//     this.type = EventType.VideoPlayed
//     this.notifications = notifications
//     this.timestamp = timestamp
//   }
// }

// class VideoStoppedEvent implements SessionEvent {
//   type: EventType
//   notifications: SessionNotifications
//   timestamp: number

//   constructor(timestamp: number, notifications: SessionNotifications) {
//     this.type = EventType.VideoStopped
//     this.notifications = notifications
//     this.timestamp = timestamp
//   }
// }

// class MessageSentEvent implements SessionEvent {
//   type: EventType
//   notifications: SessionNotifications
//   textMessage: TextMessage

//   constructor(textMessage: TextMessage, notifications: SessionNotifications) {
//     this.type = EventType.MessageSent
//     this.notifications = notifications
//     this.textMessage = textMessage
//   }
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// interface EventBus {
//   subscribe(eventType: string, listener: (event: Event) => void): void
//   publish(event: Event): void
// }

// class EventBusImpl implements EventBus {
//   listeners: { [key: string]: Array<(event: Event) => void> }

//   constructor() {
//     this.listeners = {}
//   }

//   subscribe(eventType: string, listener: (event: Event) => void): void {
//     if (!this.listeners[eventType]) {
//       this.listeners[eventType] = []
//     }
//     this.listeners[eventType].push(listener)
//   }

//   publish(event: Event): void {
//     const eventType = event.type
//     if (this.listeners[eventType]) {
//       this.listeners[eventType].forEach((listener) => listener(event))
//     }
//   }
// }

// const eventBus = new EventBusImpl()
