import { VideoReactions } from '../../presentation/reactions/videoReactions'
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
  userJoined(user: User, videoReactions: VideoReactions): Promise<void>
  userLeft(user: User, videoReactions: VideoReactions): void
  playVideo(timestamp: number, videoReactions: VideoReactions): void
  stopVideo(timestamp: number, videoReactions: VideoReactions): void
}

export class VideoImpl implements Video {
  userReactions: Map<User, VideoReactions>

  constructor() {
    this.userReactions = new Map()
  }

  async userJoined(user: User, videoReactions: VideoReactions): Promise<void> {
    console.log('USER JOINED!!!!!!!!!', this.userReactions.size)
    return Promise.all(
      Array.from(this.userReactions.values()).map((vr) => vr.retreiveVideoState())
    ).then((videoStates) => {
      console.log('VIDEO STATES!', videoStates)
      if (videoStates.length > 0) {
        const timestamps: number[] = videoStates.map((vs) => vs.timestamp)
        const minTimestamp: number = Math.min(...timestamps)
        const videoStateSync: VideoState = videoStates[timestamps.indexOf(minTimestamp)]
        videoReactions.synchronizeUser(videoStateSync)
      }
      this.userReactions.set(user, videoReactions)
    })
  }

  userLeft(user: User, videoReactions: VideoReactions): void {
    for (let key of this.userReactions.keys()) {
      if (isDeepEqual(user.id, key.id)) {
        console.log('DELETING')
        this.userReactions.delete(key)
        break
      }
    }
  }

  playVideo(timestamp: number, videoReactions: VideoReactions): void {
    videoReactions.syncronizeRoom({ state: PlayState.PLAYING, timestamp: timestamp })
  }

  stopVideo(timestamp: number, videoReactions: VideoReactions): void {
    videoReactions.syncronizeRoom({ state: PlayState.PAUSED, timestamp: timestamp })
  }
}
