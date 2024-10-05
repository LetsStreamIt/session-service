import { isDeepEqual } from './utils'

export class Pair<X, Y> {
  private readonly x: X
  private readonly y: Y

  constructor(x: X, y: Y) {
    this.x = x
    this.y = y
  }

  get getX(): X {
    return this.x
  }

  get getY(): Y {
    return this.y
  }
}

export class Entity<X, Y> {
  id: X
  value?: Y

  constructor(id: X, value?: Y) {
    this.id = id
    this.value = value
  }
}

export class Repository<X extends Entity<Y, Z>, Y = X['id'], Z = X['value']> {
  private values: X[]

  constructor(...values: X[]) {
    this.values = values
  }

  contains(id: Y): boolean {
    return this.values.some((el) => isDeepEqual(el.id, id))
  }

  add(element: X): boolean {
    if (!this.contains(element.id)) {
      this.values.push(element)
      return true
    }
    return false
  }

  remove(id: Y): boolean {
    if (this.contains(id)) {
      this.values = this.values.filter((el) => !isDeepEqual(el.id, id))
      return true
    }
    return false
  }

  find(id: Y): X | undefined {
    return this.values.find((el) => isDeepEqual(el.id, id))
  }

  get getValues(): X[] {
    return this.values
  }
}
