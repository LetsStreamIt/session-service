import { ISessionReactions } from '../reactions/sessionReactions'

/**
 * Session Event Interface
 */
export interface ISessionEvent {
  get getType(): EventType
  get getSessionReactions(): ISessionReactions
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
