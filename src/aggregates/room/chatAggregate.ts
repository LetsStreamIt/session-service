import { TextMessage, NotificationMessage, Notification } from '../../model/message'
import { Room, RoomEntry } from '../../model/room'
import { User } from '../../model/user'
import { ChatReactions } from '../../view/reactions/chatReactions'

export class ChatAggregate {
  userJoined(user: User, room: Room, chatReactions: ChatReactions) {
    const chatMessages: TextMessage[] = []
    const roomEntry: RoomEntry | undefined = room.value
    if (roomEntry) {
      chatMessages.push(...roomEntry?.getY.getMessages)
    }
    chatReactions.sendNotificationToRoom(new NotificationMessage(user, Notification.JOINROOM))
    chatReactions.emitTextMessagesToClient(...chatMessages)
  }

  userLeft(user: User, room: Room, chatReactions: ChatReactions) {
    chatReactions.sendNotificationToRoom(new NotificationMessage(user, Notification.LEAVEROOM))
  }

  sendMessage() {}
}
