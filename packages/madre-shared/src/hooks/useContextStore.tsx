import {
  type Context,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';

/**
 * @description useContextStore 와 함께 사용합니다.
 * @description context api 를 사용할때, value 로 사용되는 값을 만드는 hook 입니다.
 * 리렌더 최적화를 위한 방법으로 useSyncExternalStore 를 사용시, 주입할 interface 를 구현합니다.
 * ref 에 값을 세팅해 리렌더를 최적화 합니다.
 *
 * @param State
 *
 * @returns  {
 *   getState: () => State;
 *   getServerState: () => State;
 *   set: (update: Partial<State> | ((state: State) => State) | ((state: State) => Partial<State>)) => void;
 *   subscribe: (callback: () => void) => () => boolean;
 * }
 */
export function useInitContextStore<
  State extends Record<string, unknown> = Record<string, never>,
>(initialState: { [k in keyof State]: State[k] }) {
  const store = useRef<State>({ ...initialState });
  const subscribers = useRef<Set<() => void>>(new Set());

  return useMemo(
    () => ({
      getState: () => store.current,
      getServerState: () => store.current,
      set: (
        update:
          | ((state: State) => State)
          | ((state: State) => Partial<State>)
          | Partial<State>,
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

/**
 * @description useInitContextStore 와 함께 사용합니다.
 * @description useSyncExternalStore 에 인자로 충족하는 값을 가지고 있는
 * context 를 주입받아, useSyncExternalStore 와 연결해 줍니다.
 * 이때 주입받을 context 의 값은 useInitContextStore 사용해 만듦니다.
 *
 * @param selectStore: Context<ContextStore<Store> | null>
 * @param selector: (store: Store) => { [k in keyof Store]: Store[k] }
 *
 * @returns [
 *   state: { [k in keyof Store]: Store[k]; }
 *   set: (update: Partial<Store> | ((state: Store) => Store) | ((state: Store) => Partial<Store>)) => void
 * ]
 */
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
    () => selector(store.getState()),
    () => selector(store.getServerState()),
  );

  return [state, store.set] as const;
}

export type ContextStore<
  ContextData extends Record<string, unknown> = Record<string, never>,
> = ReturnType<typeof useInitContextStore<ContextData>>;
