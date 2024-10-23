/**
 * Video Reaction Type
 */
export enum VideoReactionType {
  VIDEO_STATE = 'videoState',
  SYNCHRONIZE = 'synchronize'
}

/**
 * Play State
 */
export enum PlayState {
  PAUSED = 'Paused',
  PLAYING = 'Playing'
}

/**
 * Video State
 */
export interface IVideoState {
  timestamp: number
  state: PlayState
}

/**
 * Video Reactions Implementation
 */
export interface IVideoReactions {
  /**
   * Retreives the Video State from the client
   */
  retreiveVideoState(): Promise<IVideoState>

  /**
   * Synchronizes the client
   * @param videoState Video State
   */
  synchronizeClient(videoState: IVideoState): void

  /**
   * Syncrhonizes the session
   * @param videoState
   */
  syncronizeSession(videoState: IVideoState): void
}
