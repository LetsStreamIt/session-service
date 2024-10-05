import { UserId, User } from './room/user'

export function getUserEmailFromToken(token: string): UserId {
  return new UserId(token)
}

export function getUserFromToken(token: string): User {
  return new User(getUserEmailFromToken(token), 'Name', 'Surname')
}
