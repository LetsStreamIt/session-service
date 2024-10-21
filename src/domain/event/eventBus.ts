import { ISessionEvent, EventType } from './event'

export interface IEventBus {
  subscribe<X extends ISessionEvent>(
    eventType: EventType,
    listener: (event: X) => Promise<void>
  ): void
  publish(event: ISessionEvent): void
}

export class EventBus implements IEventBus {
  listeners: Record<string, ((event: any) => Promise<void>)[]>

  constructor() {
    this.listeners = {}
  }

  subscribe<X extends ISessionEvent>(
    eventType: EventType,
    listener: (event: X) => Promise<void>
  ): void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = []
    }
    this.listeners[eventType].push(listener)
  }

  async publish(event: ISessionEvent): Promise<void> {
    const eventType = event.type
    if (this.listeners[eventType]) {
      this.listeners[eventType].reduce(
        (accumulator, listener) => accumulator.then(() => listener(event)),
        Promise.resolve()
      )
    }
  }
}
