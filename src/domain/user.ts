import { Entity, Repository } from './entity'

/**
 * User
 */
export class User implements Entity<UserId, string> {
  id: UserId
  value: string

  constructor(id: UserId, username: string) {
    this.id = id
    this.value = username
  }
}

/**
 * User Id
 */
export class UserId {
  email: string

  constructor(email: string) {
    this.email = email
  }
}

/**
 * User Repository
 */
export class UserRepository extends Repository<User> {}
