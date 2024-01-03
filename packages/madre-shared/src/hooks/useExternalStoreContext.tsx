import { type Context, useContext, useSyncExternalStore } from 'react';

/**
 * @description createExternalStoreContext 와 함께 사용합니다.
 * @description useSyncExternalStore 에 인자로 충족하는 값을 가지고 있는
 * context 를 주입받아, useSyncExternalStore 와 연결해 줍니다.
 * 이때 주입받을 context 의 값은 createExternalStoreContext 사용해 만듦니다.
 *
 * @param selectStore: Context<ExternalStoreContext<Store> | null>
 * @param selector: (store: Store) => { [k in keyof Store]: Store[k] }
 *
 * @returns
 * [
 *   state: { [k in keyof Store]: Store[k]; },
 *   set: (update: Partial<Store> | ((state: Store) => Store) | ((state: Store) => Partial<Store>)) => void
 * ]
 */
export function useExternalStoreContext<
  StoreContext extends Record<string, unknown> = Record<string, never>,
>(
  storeContext: Context<ExternalStoreContext<StoreContext> | null>,
  selector: (store: StoreContext) => {
    [k in keyof StoreContext]: StoreContext[k];
  } = (store) => store,
) {
  const store = useContext(storeContext);

  if (!store) {
    throw new Error(`not found ${storeContext.displayName}`);
  }

  const state = useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getServerState()),
  );

  return [state, store.set] as const;
}

/**
 * @description useExternalStoreContext 와 함께 사용합니다.
 * @description context api 를 사용할때, value 로 사용되는 값을 만드는 hook 입니다.
 * 리렌더 최적화를 위한 방법으로 외부 store 를 사용하기 위해 useSyncExternalStore 사용하며, 이때 주입할 interface 를 구현합니다.
 *
 * @param State
 *
 * @returns
 * {
 *   getState: () => State;
 *   getServerState: () => State;
 *   set: (update: Partial<State> | ((state: State) => State) | ((state: State) => Partial<State>)) => void;
 *   subscribe: (callback: () => void) => () => boolean;
 * }
 */
export function createExternalStoreContext<
  State extends Record<string, unknown> = Record<string, never>,
>(initialState: { [k in keyof State]: State[k] }) {
  let state = { ...initialState };
  const subscribers = new Set<() => void>(new Set());

  return {
    getState: () => state,
    getServerState: () => state,
    set: (
      partial:
        | ((state: State) => State)
        | ((state: State) => Partial<State>)
        | Partial<State>,
    ) => {
      const nextState =
        typeof partial === 'function' ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        state =
          typeof nextState !== 'object' && nextState === null
            ? state
            : Object.assign({}, state, nextState);
      }
      return subscribers.forEach((callback) => callback());
    },
    subscribe: (callback: () => void) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
  };
}

export type ExternalStoreContext<
  State extends Record<string, unknown> = Record<string, never>,
> = ReturnType<typeof createExternalStoreContext<State>>;
