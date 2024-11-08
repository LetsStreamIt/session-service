import { IChatReactions } from './chatReactions'
import { IVideoReactions } from './videoReactions'

export interface ISessionReactions {
  readonly chatReactions: IChatReactions
  readonly videoReactions: IVideoReactions

  /**
   * Join User to Session reaction
   */
  joinUserToSession(): void

  /**
   * Leave User from Session Reaction
   */
  leaveUserFromSessionAndDisconnect(): void
}
