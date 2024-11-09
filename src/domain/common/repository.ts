import { Entity } from './entity'
import { isDeepEqual } from './utils'

/**
 * Repository
 */
export class Repository<X extends Entity<Y, Z>, Y, Z> {
  private uValues: X[]

  constructor() {
    this.uValues = []
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
