import { EventType } from '../../../src/domain/common/event/event'
import { IEventBus, EventBus } from '../../../src/domain/common/event/eventBus'
import { MessageSentEvent } from '../../../src/domain/aggregates/chat/events/chatEvents'
import { TextMessage } from '../../../src/domain/aggregates/chat/message'
import { User, UserId } from '../../../src/domain/common/user'
import { EmptySessionReactions } from '../emptyReactions/emptySessionReactions'
import { expect } from 'chai'
import { EmptyChatReactions } from '../emptyReactions/emptyChatReactions'
import { EmptyVideoReactions } from '../emptyReactions/emptyVideoReactions'

describe('event bus', () => {
  const eventBus: IEventBus = new EventBus()
  const publisher: User = new User(new UserId('publisherUsername'), 'publisher@email.com')
  const message: TextMessage = new TextMessage(publisher, 'testMessage')

  it('should allow to react and publish events', (done) => {
    eventBus.subscribe(EventType.MessageSent, async (messageSentEvent: MessageSentEvent) => {
      expect(messageSentEvent.getTextMessage).to.be.equal(message)
      done()
    })

    eventBus.publish(
      new MessageSentEvent(
        message,
        new EmptySessionReactions(new EmptyChatReactions(), new EmptyVideoReactions())
      )
    )
  })
})
