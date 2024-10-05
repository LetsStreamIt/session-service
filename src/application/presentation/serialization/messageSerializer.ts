export interface Serializer<X> {
  serialize(message: X): string
}

export class SerializerImpl<X> implements Serializer<X> {
  serialize(message: X): string {
    return JSON.stringify(message)
  }
}
