import { EventType } from '../../../src/domain/event/event'
import {IEventBus, EventBus} from '../../../src/domain/event/eventBus'
import {MessageSentEvent} from '../../../src/domain/aggregates/chat/events/chatEvents'
import { TextMessage } from '../../../src/domain/aggregates/chat/message'
import { User, UserId } from '../../../src/domain/user'
import { EmptySessionReactions } from './emptySessionReactions'
import { expect } from 'chai'



describe("event bus", () => {

    const eventBus: IEventBus = new EventBus()
    const publisher: User = new User(new UserId("publisherUsername"), "publisher@email.com")
    const message: TextMessage = new TextMessage(publisher, "testMessage")

    it("should allow to react and publish events", (done) => {

        eventBus.subscribe(EventType.MessageSent, async (messageSentEvent: MessageSentEvent) => {
            expect(messageSentEvent.getTextMessage).to.be.equal(message)
            done()
        })

        eventBus.publish(new MessageSentEvent(message, new EmptySessionReactions()))
    })


})