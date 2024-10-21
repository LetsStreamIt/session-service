export enum ChatReactionType {
  NOTIFICATION_MESSAGE = 'notificationMessage',
  TEXT_MESSAGE = 'textMessage'
}

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
