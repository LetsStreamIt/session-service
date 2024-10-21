import { IChatReactions } from './chatReactions'
import { IVideoReactions } from './videoReactions'

export interface ISessionReactions {
  /**
   * Join User to Session reaction
   */
  joinUserToSession(): void

  /**
   * Leave User from Session Reaction
   */
  leaveUserFromSessionAndDisconnect(): void

  get getChatReactions(): IChatReactions

  get getVideoReactions(): IVideoReactions
}
