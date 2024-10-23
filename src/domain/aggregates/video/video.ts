import { EventType } from '../../event/event'
import { IEventBus } from '../../event/eventBus'
import { IVideoReactions } from '../../reactions/videoReactions'
import { User } from '../../user'
import { isDeepEqual } from '../../utils'
import { UserJoinedSessionEvent, UserLeftSessionEvent } from '../session/events/sessionEvents'
import { VideoPlayedEvent, VideoStoppedEvent } from './events/videoEvents'

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
export interface VideoState {
  timestamp: number
  state: PlayState
}

/**
 * Video Aggregate Interface
 */
export interface IVideo {
  /**
   * Register Event Handlers for Events triggered by the Session Service.
   */
  registerEventHandlers(): void

  /**
   * Returns the Video Id of the video associated to the aggregate.
   */
  get getVideoId(): string
}

export class Video implements IVideo {
  userReactions: Map<User, IVideoReactions>
  videoId: string
  eventBus: IEventBus

  constructor(videoRef: string, eventBus: IEventBus) {
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

  /**
   * User Joined Session Event Handler.
   * Uses the interface layer reaction to synchronize the joined User:
   * 1. The Video State of each connected User to the Session is retreived
   * 2. The minimum timestamp across all Video States is selected as the timestamp of the joined User
   * 3. A message is sent to the joined User to synchronize the video timestamp.
   * @param event User Joined Session Event
   * @returns void Promise
   */
  private handleUserJoinedEvent: (event: UserJoinedSessionEvent) => Promise<void> = (
    event: UserJoinedSessionEvent
  ) => {
    return new Promise((resolve) => {
      return Promise.all(
        Array.from(this.userReactions.values()).map((videoReactions) =>
          videoReactions.retreiveVideoState()
        )
      ).then((videoStates) => {
        if (videoStates.length > 0) {
          const timestamps: number[] = videoStates.map((videoState) => videoState.timestamp)
          const minTimestamp: number = Math.min(...timestamps)
          const videoStateSync: VideoState = videoStates[timestamps.indexOf(minTimestamp)]
          event.getSessionReactions.getVideoReactions.synchronizeClient(videoStateSync)
        }
        this.userReactions.set(event.getUser, event.getSessionReactions.getVideoReactions)
        resolve()
      })
    })
  }

  /**
   * User Left Session Event Handler.
   * Removes the User Reactions from the list.
   * @param event User Left Session Event
   * @returns void Promise
   */
  private handleUserLeftEvent: (event: UserLeftSessionEvent) => Promise<void> = (
    event: UserLeftSessionEvent
  ) => {
    return new Promise((resolve) => {
      for (const key of this.userReactions.keys()) {
        if (isDeepEqual(event.getUser.getId, key.getId)) {
          this.userReactions.delete(key)
          break
        }
      }
      resolve()
    })
  }

  /**
   * Video Played Event Handler.
   * Synchronizes each User's client connected to the Session, by setting the video in play mode
   * and setting each client timestamp with respect to the User who executed the command.
   * @param event Video Play Event
   * @returns void Promise
   */
  private handleVideoPlayedEvent: (event: VideoPlayedEvent) => Promise<void> = (
    event: VideoPlayedEvent
  ) => {
    return new Promise((resolve) => {
      event.getSessionReactions.getVideoReactions.syncronizeSession({
        state: PlayState.PLAYING,
        timestamp: event.getTimestamp
      })
      resolve()
    })
  }

  /**
   * Video Stopped Event Handler.
   * Synchronizes each User's client connected to the Session, by setting the video in stop mode
   * and setting each client timestamp with respect to the User who executed the command.
   * @param event Video Stopped Event
   * @returns void Promise
   */
  private handleStopVideoEvent: (event: VideoStoppedEvent) => Promise<void> = (
    event: VideoStoppedEvent
  ) => {
    return new Promise((resolve) => {
      event.getSessionReactions.getVideoReactions.syncronizeSession({
        state: PlayState.PAUSED,
        timestamp: event.getTimestamp
      })
      resolve()
    })
  }
}
