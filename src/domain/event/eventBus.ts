import { SessionEvent, EventType } from './event'

export interface EventBus {
  subscribe<X extends SessionEvent>(
    eventType: EventType,
    listener: (event: X) => Promise<void>
  ): void
  publish(event: SessionEvent): void
}

export class EventBusImpl implements EventBus {
  listeners: Record<string, ((event: any) => Promise<void>)[]>

  constructor() {
    this.listeners = {}
  }

  subscribe<X extends SessionEvent>(
    eventType: EventType,
    listener: (event: X) => Promise<void>
  ): void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = []
    }
    this.listeners[eventType].push(listener)
  }

  async publish(event: SessionEvent): Promise<void> {
    const eventType = event.type
    if (this.listeners[eventType]) {
      this.listeners[eventType].reduce(
        (accumulator, listener) => accumulator.then(() => listener(event)),
        Promise.resolve()
      )
    }
  }
}
