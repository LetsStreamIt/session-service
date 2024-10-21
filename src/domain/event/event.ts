import { ISessionReactions } from '../reactions/sessionReactions'

/**
 * Session Event Interface
 */
export interface ISessionEvent {
  type: EventType
  sessionReactions: ISessionReactions
}

/**
 * Event Type
 */
export enum EventType {
  SessionCreated,
  UserJoinedSession,
  UserLeftSession,
  MessageSent,
  VideoPlayed,
  VideoStopped
}
