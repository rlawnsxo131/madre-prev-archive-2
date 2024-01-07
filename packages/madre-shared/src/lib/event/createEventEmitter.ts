export type EventsMap = { [event: string]: any };
export type DefaultEvents = {
  [event: string]: (...args: any[]) => void;
};

export interface EventEmitter<Events extends EventsMap = DefaultEvents> {
  events: Partial<{ [E in keyof Events]: Set<Events[E]> }>;
  emit: <K extends keyof Events>(
    this: this,
    event: K,
    ...args: Parameters<Events[K]>
  ) => void;
  on<K extends keyof Events>(this: this, event: K, cb: Events[K]): () => void;
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
    emit(event, ...args) {
      if (this.events[event]) return;
      for (const callback of this.events[event]!) {
        callback(...args);
      }
    },
    on(event, cb) {
      (this.events[event] ??= new Set()).add(cb);
      return () => {
        this.events[event]?.delete(cb);
      };
    },
  };
}
