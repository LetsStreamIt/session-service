/**
 * Deserializer Interface
 */
interface IDeserializer<X> {
  /**
   * Deserializes a message
   * @param json message body
   */
  deserialize(json: any): X
}

/**
 * Abstract deserializer
 */
export abstract class AbstractDeserializer<X> implements IDeserializer<X> {
  abstract isJsonValid(json: any): boolean

  abstract deserializeJson(json: any): X

  deserialize(json: any): X {
    if (this.isJsonValid(json)) {
      return this.deserializeJson(json)
    } else {
      throw new Error(`Json parse exception ${this.constructor.name.toString()}`)
    }
  }
}
