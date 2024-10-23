import { isDeepEqual } from './utils'

/**
 * Pair of objects
 */
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

/**
 * Entity
 */
export class Entity<X, Y> {
  protected readonly id: X
  protected readonly value: Y

  constructor(id: X, value: Y) {
    this.id = id
    this.value = value
  }

  get getId(): X {
    return this.id
  }
}

/**
 * Repository
 */
export class Repository<X extends Entity<Y, Z>, Y, Z> {
  private values: X[]

  constructor(...values: X[]) {
    this.values = values
  }

  contains(id: Y): boolean {
    return this.values.some((el) => isDeepEqual(el.getId, id))
  }

  add(element: X): boolean {
    if (!this.contains(element.getId)) {
      this.values.push(element)
      return true
    }
    return false
  }

  remove(id: Y): boolean {
    if (this.contains(id)) {
      this.values = this.values.filter((el) => !isDeepEqual(el.getId, id))
      return true
    }
    return false
  }

  find(id: Y): X | undefined {
    return this.values.find((el) => isDeepEqual(el.getId, id))
  }

  get getValues(): X[] {
    return this.values
  }
}
