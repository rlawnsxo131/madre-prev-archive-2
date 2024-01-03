import { type Context, useContext, useSyncExternalStore } from 'react';

/**
 * @example
 * const ExampleContext = createContext<ExternalStoreContext<{
 *   bool: boolean;
 * }> | null>(null);
 *
 * function ExampleProvider({ children }: { children: ReactNode }) {
 *   return (
 *     <ExampleContext.Provider value={createExternalStoreContext({ bool: false })}>
 *       {children}
 *     </ExampleContext.Provider>
 *   );
 * }
 *
 * function useExampleContext() {
 *   const [{ bool }, set] = useExternalStoreContext(ExampleContext);
 *
 *   return [bool, {
 *     setTrue: () => set({ bool: true }),
 *     setFalse: () => set({ bool: false }),
 *     ...
 *   }]
 */

/**
 * @description createExternalStoreContext 와 함께 사용합니다.
 * @description useSyncExternalStore 에 인자로 충족하는 값을 가지고 있는
 * context 를 주입받아, useSyncExternalStore 와 연결해 줍니다.
 * 이때 주입받을 context 의 값은 createExternalStoreContext 사용해 만듭니다.
 *
 * @param storeContext: Context<ExternalStoreContext<StoreContext> | null>
 * @param selector: (store: StoreContext) => { [k in keyof StoreContext]: Store[k] }
 *
 * @returns
 * [
 *   state: { [k in keyof StoreContext]: StoreContext[k]; },
 *   set: (partial: Partial<StoreContext> | ((state: StoreContext) => StoreContext) | ((state: StoreContext) => Partial<StoreContext>)) => void
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
 * 리렌더 최적화를 위한 방법으로 react가 제공하는 기본적인 state 관련 기능을 사용하지 않습니다.
 * useExternalStoreContext 는 useSyncExternalStore 로 상태를 동기화 하며,
 * 이때 useSyncExternalStore 에 interface를 충족시키는 기능을 구현합니다.
 *
 * @param State
 *
 * @returns
 * {
 *   getState: () => State;
 *   getServerState: () => State;
 *   set: (partial: Partial<State> | ((state: State) => State) | ((state: State) => Partial<State>)) => void;
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
