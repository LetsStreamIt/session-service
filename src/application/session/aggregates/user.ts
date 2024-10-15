import { Entity, Pair, Repository } from '../../entity'

export class User implements Entity<UserId, Pair<string, string>> {
  id: UserId
  value: Pair<string, string>

  constructor(id: UserId, name: string, surname: string) {
    this.id = id
    this.value = new Pair(name, surname)
  }
}

export class UserId {
  email: string

  constructor(email: string) {
    this.email = email
  }
}

export class UserRepository extends Repository<User> {}
