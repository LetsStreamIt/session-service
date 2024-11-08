import { Entity, Repository } from './entity'

/**
 * User
 */
export class User extends Entity<UserId, string> {
  get username(): string {
    return this.entityValue
  }
}

/**
 * User Id
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
