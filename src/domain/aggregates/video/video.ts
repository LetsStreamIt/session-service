import { EventType } from '../../common/event/event'
import { IEventBus } from '../../common/event/eventBus'
import { IVideoReactions, IVideoState, PlayState } from '../../common/reactions/videoReactions'
import { User } from '../../common/user'
import { isDeepEqual } from '../../common/utils'
import { UserJoinedSessionEvent, UserLeftSessionEvent } from '../session/events/sessionEvents'
import { VideoPlayedEvent, VideoStoppedEvent } from './events/videoEvents'

/**
 * Video Aggregate Interface
 */
export interface IVideo {
  readonly videoRef: string

  /**
   * Register Event Handlers for Events triggered by the Session Service.
   */
  registerEventHandlers(): void
}

export class Video implements IVideo {
  readonly userReactions: Map<User, IVideoReactions>
  readonly videoRef: string
  readonly eventBus: IEventBus

  constructor(videoRef: string, eventBus: IEventBus) {
    this.userReactions = new Map()
    this.videoRef = videoRef
    this.eventBus = eventBus
  }

  registerEventHandlers(): void {
    this.eventBus.subscribe(EventType.UserJoinedSession, this.handleUserJoinedEvent)
    this.eventBus.subscribe(EventType.UserLeftSession, this.handleUserLeftEvent)
    this.eventBus.subscribe(EventType.VideoPlayed, this.handleVideoPlayedEvent)
    this.eventBus.subscribe(EventType.VideoStopped, this.handleStopVideoEvent)
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
          const videoStateSync: IVideoState = videoStates[timestamps.indexOf(minTimestamp)]
          event.reactions.videoReactions.synchronizeClient(videoStateSync)
        }
        this.userReactions.set(event.user, event.reactions.videoReactions)
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
        if (isDeepEqual(event.user.id, key.id)) {
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
      event.reactions.videoReactions.syncronizeSession({
        state: PlayState.PLAYING,
        timestamp: event.timestamp
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
      event.reactions.videoReactions.syncronizeSession({
        state: PlayState.PAUSED,
        timestamp: event.timestamp
      })
      resolve()
    })
  }
}
