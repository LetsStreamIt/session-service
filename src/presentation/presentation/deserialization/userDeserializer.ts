import { UserId, User } from '../../../application/session/aggregates/user'
import { AbstractDeserializer } from './deserializer'

class UserIdDeserializer extends AbstractDeserializer<UserId> {
  isJsonValid(json: any): boolean {
    return typeof json.email === 'string'
  }

  deserializeJson(json: any): UserId {
    return new UserId(json.email)
  }
}

export class UserDeserializer extends AbstractDeserializer<User> {
  isJsonValid(json: any): boolean {
    return (
      typeof json.id === 'object' &&
      typeof json.value.x === 'string' &&
      typeof json.value.y === 'string'
    )
  }

  deserializeJson(json: any): User {
    return new User(new UserIdDeserializer().deserialize(json.id), json.value.x, json.value.y)
  }
}
