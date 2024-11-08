import { ISessionReactions } from '../reactions/sessionReactions'

/**
 * Session Event Interface
 */
export interface ISessionEvent {
  readonly type: EventType
  readonly reactions: ISessionReactions
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
