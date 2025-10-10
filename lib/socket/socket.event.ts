type Listener<T> = (payload: T) => void;

/**
 * A lightweight, type-safe event emitter class.
 */
export class EventEmitter<Events extends Record<string, any>> {
  private listeners: { [K in keyof Events]?: Set<Listener<Events[K]>> } = {};

  /**
   * Emits an event to all registered listeners.
   */
  emit<K extends keyof Events>(eventName: K, payload: Events[K]): void {
    this.listeners[eventName]?.forEach((listener) => listener(payload));
  }

  /**
   * Registers a listener for an event.
   */
  on<K extends keyof Events>(
    eventName: K,
    listener: Listener<Events[K]>
  ): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = new Set();
    }
    this.listeners[eventName]!.add(listener);
  }

  /**
   * Unregisters a listener for an event.
   */
  off<K extends keyof Events>(
    eventName: K,
    listener: Listener<Events[K]>
  ): void {
    this.listeners[eventName]?.delete(listener);
  }
}
