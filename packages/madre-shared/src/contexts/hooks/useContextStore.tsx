import {
  type Context,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';

export function useInitContextStore<
  ContextData extends Record<string, unknown> = Record<string, never>,
>(initialState: ContextData) {
  const store = useRef<ContextData>({ ...initialState });
  const subscribers = useRef<Set<() => void>>(new Set());

  return useMemo(
    () => ({
      get: () => store.current,
      set: (
        update:
          | ((state: ContextData) => ContextData)
          | ((state: ContextData) => Partial<ContextData>)
          | Partial<ContextData>,
      ) => {
        const newState =
          typeof update === 'function' ? update(store.current) : update;
        store.current = {
          ...store.current,
          ...newState,
        };
        return subscribers.current.forEach((callback) => callback());
      },
      subscribe: (callback: () => void) => {
        subscribers.current.add(callback);
        return () => subscribers.current.delete(callback);
      },
    }),
    [],
  );
}

export function useContextStore<
  Store extends Record<string, unknown> = Record<string, never>,
>(
  selectStore: Context<ContextStore<Store> | null>,
  selector: (store: Store) => { [k in keyof Store]: Store[k] } = (store) =>
    store,
) {
  const store = useContext(selectStore);

  if (!store) {
    throw new Error(`not found ${selectStore.displayName}`);
  }

  const state = useSyncExternalStore(
    store.subscribe,
    () => selector(store.get()),
    () => selector(store.get()),
  );

  return [state, store.set] as const;
}

export type ContextStore<ContextData extends Record<string, unknown>> =
  ReturnType<typeof useInitContextStore<ContextData>>;
