import { ISessionEvent, EventType } from './event'

/**
 * Event Bus Interface
 */
export interface IEventBus {
  /**
   * Subscribes to Event of Event Type by registering a listener
   * @param eventType Event Type
   * @param listener Listener
   */
  subscribe<X extends ISessionEvent>(
    eventType: EventType,
    listener: (event: X) => Promise<void>
  ): void

  /**
   * Publishes a Session Event i.e. executes all listener function associated to Event Type of the specified Session Event.
   * @param event Session Event
   */
  publish(event: ISessionEvent): void
}

/**
 * Event Bus Implementation
 */
export class EventBus implements IEventBus {
  private readonly listeners: Record<string, ((event: any) => Promise<void>)[]>

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
