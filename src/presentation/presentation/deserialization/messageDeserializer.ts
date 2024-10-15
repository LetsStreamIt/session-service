import { TextMessage, NotificationMessage } from '../../../application/session/message'
import { AbstractDeserializer } from './deserializer'
import { UserDeserializer } from './userDeserializer'

export class TextMessageDeserializer extends AbstractDeserializer<TextMessage> {
  isJsonValid(json: any): boolean {
    return typeof json.sender === 'object' && typeof json.content === 'string'
  }

  deserializeJson(json: any): TextMessage {
    return new TextMessage(new UserDeserializer().deserialize(json.sender), json.content)
  }
}

export class NotificationMessageDeserializer extends AbstractDeserializer<NotificationMessage> {
  isJsonValid(json: any): boolean {
    return typeof json.sender === 'object' && typeof json.content === 'number'
  }

  deserializeJson(json: any): NotificationMessage {
    return new NotificationMessage(new UserDeserializer().deserialize(json.sender), json.content)
  }
}
