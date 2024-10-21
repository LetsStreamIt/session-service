import { IChatReactions } from './chatReactions'
import { IVideoReactions } from './videoReactions'

export interface ISessionReactions {
  joinUserToSession(): void

  leaveUserFromSessionAndDisconnect(): void

  get getChatReactions(): IChatReactions

  get getVideoReactions(): IVideoReactions
}
