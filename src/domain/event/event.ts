import { ISessionReactions } from '../reactions/sessionReactions'

export interface ISessionEvent {
  type: EventType
  sessionReactions: ISessionReactions
}

export enum EventType {
  SessionCreated,
  UserJoinedSession,
  UserLeftSession,
  MessageSent,
  VideoPlayed,
  VideoStopped
}
