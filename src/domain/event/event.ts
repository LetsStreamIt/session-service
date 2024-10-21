import { SessionReactions } from '../reactions/sessionReactions'

export interface SessionEvent {
  type: EventType
  sessionReactions: SessionReactions
}

export enum EventType {
  SessionCreated,
  UserJoinedSession,
  UserLeftSession,
  MessageSent,
  VideoPlayed,
  VideoStopped
}
