export interface ISerializer<X> {
  serialize(message: X): string
}

export class SerializerImpl<X> implements ISerializer<X> {
  serialize(message: X): string {
    return JSON.stringify(message)
  }
}
