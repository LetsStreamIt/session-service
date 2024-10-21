import { EventType } from '../../event/event'
import { EventBus } from '../../event/eventBus'
import { VideoReactions } from '../../reactions/videoReactions'
import { User } from '../../user'
import { isDeepEqual } from '../../utils'
import { UserJoinedEvent, UserLeftSessionEvent } from '../session/events/sessionEvents'
import { VideoPlayedEvent, VideoStoppedEvent } from './events/videoEvents'

export enum PlayState {
  PAUSED = 'Paused',
  PLAYING = 'Playing'
}

export interface VideoState {
  timestamp: number
  state: PlayState
}

export interface Video {
  registerEventHandlers(): void

  get getVideoId(): string
}

export class VideoImpl implements Video {
  userReactions: Map<User, VideoReactions>
  videoId: string
  eventBus: EventBus

  constructor(videoRef: string, eventBus: EventBus) {
    this.userReactions = new Map()
    this.videoId = videoRef
    this.eventBus = eventBus
  }

  registerEventHandlers(): void {
    this.eventBus.subscribe(EventType.UserJoinedSession, this.handleUserJoinedEvent)
    this.eventBus.subscribe(EventType.UserLeftSession, this.handleUserLeftEvent)
    this.eventBus.subscribe(EventType.VideoPlayed, this.handleVideoPlayedEvent)
    this.eventBus.subscribe(EventType.VideoStopped, this.handleStopVideoEvent)
  }

  get getVideoId(): string {
    return this.videoId
  }

  private handleUserJoinedEvent: (event: UserJoinedEvent) => Promise<void> = (
    event: UserJoinedEvent
  ) => {
    return new Promise((resolve) => {
      return Promise.all(
        Array.from(this.userReactions.values()).map((vr) => vr.retreiveVideoState())
      ).then((videoStates) => {
        if (videoStates.length > 0) {
          const timestamps: number[] = videoStates.map((vs) => vs.timestamp)
          const minTimestamp: number = Math.min(...timestamps)
          const videoStateSync: VideoState = videoStates[timestamps.indexOf(minTimestamp)]
          event.sessionReactions.getVideoReactions.synchronizeUser(videoStateSync)
        }
        this.userReactions.set(event.user, event.sessionReactions.getVideoReactions)
        resolve()
      })
    })
  }

  private handleUserLeftEvent: (event: UserLeftSessionEvent) => Promise<void> = (
    event: UserLeftSessionEvent
  ) => {
    return new Promise((resolve) => {
      for (const key of this.userReactions.keys()) {
        if (isDeepEqual(event.user.id, key.id)) {
          this.userReactions.delete(key)
          break
        }
      }
      resolve()
    })
  }

  private handleVideoPlayedEvent: (event: VideoPlayedEvent) => Promise<void> = (
    event: VideoPlayedEvent
  ) => {
    return new Promise((resolve) => {
      event.sessionReactions.getVideoReactions.syncronizeSession({
        state: PlayState.PLAYING,
        timestamp: event.timestamp
      })
      resolve()
    })
  }

  private handleStopVideoEvent: (event: VideoStoppedEvent) => Promise<void> = (
    event: VideoStoppedEvent
  ) => {
    return new Promise((resolve) => {
      event.sessionReactions.getVideoReactions.syncronizeSession({
        state: PlayState.PAUSED,
        timestamp: event.timestamp
      })
      resolve()
    })
  }
}
