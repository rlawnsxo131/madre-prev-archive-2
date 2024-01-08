export type EventsMap = { [event: string]: any };
export type DefaultEvents = {
  [event: string]: (...args: any[]) => void;
};

export interface EventEmitter<Events extends EventsMap = DefaultEvents> {
  events: Partial<{ [E in keyof Events]: Set<Events[E]> }>;
  on<K extends keyof Events>(this: this, event: K, cb: Events[K]): () => void;
  emit: <K extends keyof Events>(
    this: this,
    event: K,
    ...args: Parameters<Events[K]>
  ) => void;
  clear: () => void;
}

/**
 * @description 간단한 event emitter 입니다.
 *
 * @example
 * interface Events {
 *   set: (name: string, count: number) => void;
 *   tick: (volumn: number) => void;
 * }
 *
 * const emitter = createEventEmitter<Events>();
 *
 * const unbind = emitter.on('tick', volume => {
 *   console.log(volume)
 * });
 *
 * emitter.emit('set', 'prop', 1)
 * emitter.emit('tick', 1) // print 1
 * unbind();
 * emitter.emit('tick', 1) // not work
 */
export function createEventEmitter<
  Events extends EventsMap = DefaultEvents,
>(): EventEmitter<Events> {
  return {
    events: {},
    on(event, cb) {
      (this.events[event] ??= new Set()).add(cb);
      return () => {
        this.events[event]?.delete(cb);
      };
    },
    emit(event, ...args) {
      for (const callback of this.events[event] || []) {
        callback(...args);
      }
    },
    clear() {
      this.events = {};
    },
  };
}
