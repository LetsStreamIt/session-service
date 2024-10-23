import { IEventBus, EventBus } from "../../../src/domain/event/eventBus"
import { IChatReactions } from "../../../src/domain/reactions/chatReactions"
import { EmptyChatReactions } from "../emptyReactions/emptyChatReactions"
import {Video, IVideo} from '../../../src/domain/aggregates/video/video'
import { IVideoReactions, IVideoState, PlayState } from "../../../src/domain/reactions/videoReactions"
import { VideoPlayedEvent } from "../../../src/domain/aggregates/video/events/videoEvents"
import { EmptySessionReactions } from "../emptyReactions/emptySessionReactions"
import { expect } from "chai"



describe('video aggregate', () => {

    const emptyChatReactions: IChatReactions = new EmptyChatReactions()
    const eventBus: IEventBus = new EventBus()
    const video: IVideo = new Video("videoRefTest", eventBus)

    before(() => {
        video.registerEventHandlers()
    })

    it("should emit a play video message to the session", (done) => {

        const expectState: IVideoState = {
            timestamp: 0,
            state: PlayState.PLAYING
        }

        const videoReactions: IVideoReactions = {
            retreiveVideoState: function (): Promise<IVideoState> {
                throw new Error("Function not implemented.")
            },
            synchronizeClient: function (videoState: IVideoState): void {
                throw new Error("Function not implemented.")
            },
            syncronizeSession: function (videoState: IVideoState): void {
                expect(videoState).to.deep.equal(expectState)
                done()
            }
        }

        eventBus.publish(new VideoPlayedEvent(0, new EmptySessionReactions(emptyChatReactions, videoReactions)))

    })



})
