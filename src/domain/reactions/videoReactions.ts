export enum VideoReactionType {
  VIDEO_STATE = 'videoState',
  SYNCHRONIZE = 'synchronize'
}

export enum PlayState {
  PAUSED = 'Paused',
  PLAYING = 'Playing'
}

export interface VideoState {
  timestamp: number
  state: PlayState
}

export interface VideoReactions {
  retreiveVideoState(): Promise<VideoState>
  synchronizeUser(videoState: VideoState): Promise<void>
  syncronizeSession(videoState: VideoState): Promise<void>
}
