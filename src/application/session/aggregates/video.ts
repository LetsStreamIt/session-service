import { VideoNotifications } from '../../../presentation/notifications/videoNotifications'
import { isDeepEqual } from '../../utils'
import { EventBus } from '../events/eventBus'
import {
  EventType,
  UserJoinedEvent,
  UserLeftSessionEvent,
  VideoPlayedEvent,
  VideoStoppedEvent
} from '../events/events'
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
  registerEventHandlers(): void
}

export class VideoImpl implements Video {
  userReactions: Map<User, VideoNotifications>
  eventBus: EventBus

  constructor(eventBus: EventBus) {
    this.userReactions = new Map()
    this.eventBus = eventBus
  }

  registerEventHandlers(): void {
    this.eventBus.subscribe(EventType.UserJoinedSession, this.handleUserJoinedEvent)
    this.eventBus.subscribe(EventType.UserLeftSession, this.handleUserLeftEvent)
    this.eventBus.subscribe(EventType.VideoPlayed, this.handleVideoPlayedEvent)
    this.eventBus.subscribe(EventType.VideoStopped, this.handleStopVideoEvent)
  }

  private handleUserJoinedEvent: (event: UserJoinedEvent) => Promise<void> = (
    event: UserJoinedEvent
  ) => {
    return new Promise(() => {
      console.log('Handling user joined in VIDEO')
      return Promise.all(
        Array.from(this.userReactions.values()).map((vr) => vr.retreiveVideoState())
      ).then((videoStates) => {
        if (videoStates.length > 0) {
          const timestamps: number[] = videoStates.map((vs) => vs.timestamp)
          const minTimestamp: number = Math.min(...timestamps)
          const videoStateSync: VideoState = videoStates[timestamps.indexOf(minTimestamp)]
          event.notifications.getVideoReactions.synchronizeUser(videoStateSync)
        }
        this.userReactions.set(event.user, event.notifications.getVideoReactions)
      })
    })
  }

  private handleUserLeftEvent: (event: UserLeftSessionEvent) => Promise<void> = (
    event: UserLeftSessionEvent
  ) => {
    return new Promise(() => {
      for (let key of this.userReactions.keys()) {
        if (isDeepEqual(event.user.id, key.id)) {
          this.userReactions.delete(key)
          break
        }
      }
    })
  }

  private handleVideoPlayedEvent: (event: VideoPlayedEvent) => Promise<void> = (
    event: VideoPlayedEvent
  ) => {
    return new Promise(() => {
      event.notifications.getVideoReactions.syncronizeRoom({
        state: PlayState.PLAYING,
        timestamp: event.timestamp
      })
    })
  }

  private handleStopVideoEvent: (event: VideoStoppedEvent) => Promise<void> = (
    event: VideoStoppedEvent
  ) => {
    return new Promise(() => {
      event.notifications.getVideoReactions.syncronizeRoom({
        state: PlayState.PAUSED,
        timestamp: event.timestamp
      })
    })
  }
}
