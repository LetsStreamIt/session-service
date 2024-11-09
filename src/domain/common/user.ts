import { Entity } from './entity'
import { Repository } from './repository'

/**
 * User is an entity with id UserId and a string value representing the Username
 */
export class User extends Entity<UserId, string> {
  get username(): string {
    return this.entityValue
  }
}

/**
 * User Id contains a string representing the email
 */
export class UserId {
  private readonly userEmail: string

  constructor(email: string) {
    this.userEmail = email
  }

  get email(): string {
    return this.userEmail
  }
}

/**
 * User Repository
 */
export class UserRepository extends Repository<User, UserId, string> {}
