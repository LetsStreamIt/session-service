import { IEventBus, EventBus } from '../../../src/domain/common/event/eventBus'
import { IChatReactions } from '../../../src/domain/common/reactions/chatReactions'
import { EmptyChatReactions } from '../emptyReactions/emptyChatReactions'
import { Video, IVideo } from '../../../src/domain/aggregates/video/video'
import {
  IVideoReactions,
  IVideoState,
  PlayState
} from '../../../src/domain/common/reactions/videoReactions'
import { VideoPlayedEvent } from '../../../src/domain/aggregates/video/events/videoEvents'
import { EmptySessionReactions } from '../emptyReactions/emptySessionReactions'
import { expect } from 'chai'
import { User, UserId } from '../../../src/domain/common/user'
import { UserJoinedSessionEvent } from '../../../src/domain/aggregates/session/events/sessionEvents'

describe('video aggregate', () => {
  const emptyChatReactions: IChatReactions = new EmptyChatReactions()
  const eventBus: IEventBus = new EventBus()
  const video: IVideo = new Video('videoRefTest', eventBus)

  before(() => {
    video.registerEventHandlers()
  })

  it('should synchronize the video of a session when a user presses play', (done) => {
    const expectState: IVideoState = {
      timestamp: 0,
      state: PlayState.PLAYING
    }

    const videoReactions: IVideoReactions = {
      retreiveVideoState: function (): Promise<IVideoState> {
        throw new Error('Method should not be used for testing.')
      },
      synchronizeClient: function (_videoState: IVideoState): void {
        throw new Error('Method should not be used for testing.')
      },
      syncronizeSession: function (videoState: IVideoState): void {
        expect(videoState).to.deep.equal(expectState)
        done()
      }
    }
    eventBus.publish(
      new VideoPlayedEvent(0, new EmptySessionReactions(emptyChatReactions, videoReactions))
    )
  })

  it('should synchronize a user video when it joins a session', (done) => {
    const firstUser: User = new User(new UserId('firstUser@email.com'), 'firstUsername')
    const secondUser: User = new User(new UserId('secondUser@email.com'), 'secondUsername')

    const expectState: IVideoState = {
      timestamp: 0,
      state: PlayState.PLAYING
    }

    const firstUserVideoReactions: IVideoReactions = {
      retreiveVideoState: function (): Promise<IVideoState> {
        return new Promise((resolve) => {
          resolve(expectState)
        })
      },
      synchronizeClient: function (_videoState: IVideoState): void {
        throw new Error('Method should not be used for testing.')
      },
      syncronizeSession: function (_videoState: IVideoState): void {
        throw new Error('Method should not be used for testing.')
      }
    }

    const secondUserVideoReactions: IVideoReactions = {
      retreiveVideoState: function (): Promise<IVideoState> {
        throw new Error('Method should not be used for testing.')
      },
      synchronizeClient: function (videoState: IVideoState): void {
        expect(videoState).to.deep.equal(expectState)
        done()
      },
      syncronizeSession: function (_videoState: IVideoState): void {
        throw new Error('Method should not be used for testing.')
      }
    }

    eventBus.publish(
      new UserJoinedSessionEvent(
        firstUser,
        new EmptySessionReactions(emptyChatReactions, firstUserVideoReactions)
      )
    )
    setTimeout(() => {
      eventBus.publish(
        new UserJoinedSessionEvent(
          secondUser,
          new EmptySessionReactions(emptyChatReactions, secondUserVideoReactions)
        )
      ),
        100
    })
  })
})
