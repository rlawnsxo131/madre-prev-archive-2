export type EventsMap = { [event: string]: any };

export type DefaultEvents = {
  [event: string]: (...args: any[]) => void;
};

export type PartialEvents<Events> = Partial<{
  [E in keyof Events]: Set<Events[E]>;
}>;

export type EventEmitter<Events extends EventsMap = DefaultEvents> = {
  on<K extends keyof Events>(event: K, cb: Events[K]): () => void;
  emit: <K extends keyof Events>(
    event: K,
    ...args: Parameters<Events[K]>
  ) => void;
  get: () => PartialEvents<Events>;
  clear: () => void;
};

/**
 * @description 간단한 event emitter 입니다.
 */
export function createEventEmitter<
  Events extends EventsMap = DefaultEvents,
>(): EventEmitter<Events> {
  let events: PartialEvents<Events> = {};

  return {
    on: (event, cb) => {
      (events[event] ??= new Set()).add(cb);
      return () => {
        events[event]?.delete(cb);
      };
    },
    emit: (event, ...args) => {
      for (const callback of events[event] || []) {
        callback(...args);
      }
    },
    get: () => events,
    clear: () => {
      events = {};
    },
  };
}
