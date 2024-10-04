import { isDeepEqual } from './utils'

export class Entity<X, Y> {
  id: X
  value?: Y

  constructor(id: X, value?: Y) {
    this.id = id
    this.value = value
  }
}

export class Repository<X extends Entity<Y, Z>, Y = X['id'], Z = X['value']> {
  private array: X[]

  constructor(array: X[]) {
    this.array = array
  }

  contains(id: Y): boolean {
    return this.array.some((el) => isDeepEqual(el.id, id))
  }

  add(element: X): boolean {
    if (!this.contains(element.id)) {
      this.array.push(element)
      return true
    }
    return false
  }

  remove(id: Y): boolean {
    if (this.contains(id)) {
      this.array = this.array.filter((el) => !isDeepEqual(el.id, id))
      return true
    }
    return false
  }

  find(id: Y): X | undefined {
    return this.array.find((el) => isDeepEqual(el.id, id))
  }

  get values(): X[] {
    return this.array
  }
}
