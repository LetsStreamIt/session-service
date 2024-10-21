export enum VideoReactionType {
  VIDEO_STATE = 'videoState',
  SYNCHRONIZE = 'synchronize'
}

export enum PlayState {
  PAUSED = 'Paused',
  PLAYING = 'Playing'
}

export interface IVideoState {
  timestamp: number
  state: PlayState
}

export interface IVideoReactions {
  retreiveVideoState(): Promise<IVideoState>
  synchronizeUser(videoState: IVideoState): Promise<void>
  syncronizeSession(videoState: IVideoState): Promise<void>
}
