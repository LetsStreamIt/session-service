import { SessionNotifications } from '../../presentation/notifications/sessionNotifications'

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
