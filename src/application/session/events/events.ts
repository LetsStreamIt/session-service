import { SessionNotifications } from '../../../presentation/notifications/sessionNotifications'
import { TextMessage } from '../../message'
import { User } from '../aggregates/user'

export interface SessionEvent {
  type: EventType
  notifications: SessionNotifications
}

export enum EventType {
  SessionCreated,
  UserJoinedSession,
  UserLeftSession,
  MessageSent,
  VideoPlayed,
  VideoStopped
}

export class SessionCreatedEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  sessionName: string

  constructor(sessionName: string, notifications: SessionNotifications) {
    this.type = EventType.SessionCreated
    this.sessionName = sessionName
    this.notifications = notifications
  }
}

export class UserJoinedEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  user: User

  constructor(user: User, notifications: SessionNotifications) {
    this.type = EventType.UserJoinedSession
    this.notifications = notifications
    this.user = user
  }
}

export class UserLeftSessionEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  user: User

  constructor(user: User, notifications: SessionNotifications) {
    this.type = EventType.UserLeftSession
    this.notifications = notifications
    this.user = user
  }
}

export class VideoPlayedEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  timestamp: number

  constructor(timestamp: number, notifications: SessionNotifications) {
    this.type = EventType.VideoPlayed
    this.notifications = notifications
    this.timestamp = timestamp
  }
}

export class VideoStoppedEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  timestamp: number

  constructor(timestamp: number, notifications: SessionNotifications) {
    this.type = EventType.VideoStopped
    this.notifications = notifications
    this.timestamp = timestamp
  }
}

export class MessageSentEvent implements SessionEvent {
  type: EventType
  notifications: SessionNotifications
  textMessage: TextMessage

  constructor(textMessage: TextMessage, notifications: SessionNotifications) {
    this.type = EventType.MessageSent
    this.notifications = notifications
    this.textMessage = textMessage
  }
}
