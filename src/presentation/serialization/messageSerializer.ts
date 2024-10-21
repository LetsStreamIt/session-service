/**
 * Serialization interface
 */
export interface ISerializer<X> {
  /**
   * Serialize an object producting a string
   * @param message message to serialize
   */
  serialize(message: X): string
}

export class Serializer<X> implements ISerializer<X> {
  serialize(message: X): string {
    return JSON.stringify(message)
  }
}
