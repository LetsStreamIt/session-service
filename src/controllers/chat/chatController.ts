import { RoomId } from '../../model/room'
import { TextMessage } from '../../model/message'
import { User } from '../../model/user'
import { getUserFromToken } from '../utils'

export class ChatController {
  async sendMessage(token: string, message: string, room: string): Promise<TextMessage> {
    return new Promise((resolve, reject) => {
      if (message !== '') {
        const user: User = getUserFromToken(token)
        const textMessage: TextMessage = new TextMessage(user, message)
        this.rooms.find(new RoomId(room))?.sendMessage(textMessage)
        resolve(textMessage)
      } else {
        reject()
      }
    })
  }
}
