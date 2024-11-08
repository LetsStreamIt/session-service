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
  protected readonly entityId: X
  protected readonly entityValue: Y

  constructor(id: X, value: Y) {
    this.entityId = id
    this.entityValue = value
  }

  get id(): X {
    return this.entityId
  }
}

/**
 * Repository
 */
export class Repository<X extends Entity<Y, Z>, Y, Z> {
  private uValues: X[]

  constructor(...values: X[]) {
    this.uValues = values
  }

  contains(id: Y): boolean {
    return this.uValues.some((el) => isDeepEqual(el.id, id))
  }

  add(element: X): boolean {
    if (!this.contains(element.id)) {
      this.uValues.push(element)
      return true
    }
    return false
  }

  remove(id: Y): boolean {
    if (this.contains(id)) {
      this.uValues = this.uValues.filter((el) => !isDeepEqual(el.id, id))
      return true
    }
    return false
  }

  find(id: Y): X | undefined {
    return this.uValues.find((el) => isDeepEqual(el.id, id))
  }

  get values(): X[] {
    return this.uValues
  }
}
