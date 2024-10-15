import { VideoNotifications } from '../../presentation/notifications/videoNotifications'
import { isDeepEqual } from '../utils'
import { User } from './user'

export enum PlayState {
  PAUSED = 'Paused',
  PLAYING = 'Playing'
}

export interface VideoState {
  timestamp: number
  state: PlayState
}

export interface Video {
  userJoined(user: User, videoReactions: VideoNotifications): Promise<void>
  userLeft(user: User, videoReactions: VideoNotifications): void
  playVideo(timestamp: number, videoReactions: VideoNotifications): void
  stopVideo(timestamp: number, videoReactions: VideoNotifications): void
}

export class VideoImpl implements Video {
  userReactions: Map<User, VideoNotifications>

  constructor() {
    this.userReactions = new Map()
  }

  async userJoined(user: User, videoReactions: VideoNotifications): Promise<void> {
    return Promise.all(
      Array.from(this.userReactions.values()).map((vr) => vr.retreiveVideoState())
    ).then((videoStates) => {
      if (videoStates.length > 0) {
        const timestamps: number[] = videoStates.map((vs) => vs.timestamp)
        const minTimestamp: number = Math.min(...timestamps)
        const videoStateSync: VideoState = videoStates[timestamps.indexOf(minTimestamp)]
        videoReactions.synchronizeUser(videoStateSync)
      }
      this.userReactions.set(user, videoReactions)
    })
  }

  userLeft(user: User, videoReactions: VideoNotifications): void {
    for (let key of this.userReactions.keys()) {
      if (isDeepEqual(user.id, key.id)) {
        this.userReactions.delete(key)
        break
      }
    }
  }

  playVideo(timestamp: number, videoReactions: VideoNotifications): void {
    videoReactions.syncronizeRoom({ state: PlayState.PLAYING, timestamp: timestamp })
  }

  stopVideo(timestamp: number, videoReactions: VideoNotifications): void {
    videoReactions.syncronizeRoom({ state: PlayState.PAUSED, timestamp: timestamp })
  }
}
