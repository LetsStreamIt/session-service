interface IDeserializer<X> {
  deserialize(json: any): X
}

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
