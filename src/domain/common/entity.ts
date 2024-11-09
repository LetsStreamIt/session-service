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
