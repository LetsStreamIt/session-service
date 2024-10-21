import { ChatReactions } from './chatReactions'
import { VideoReactions } from './videoReactions'

export interface SessionReactions {
  joinUserToSession(): void

  leaveUserFromSessionAndDisconnect(): void

  get getChatReactions(): ChatReactions

  get getVideoReactions(): VideoReactions
}
