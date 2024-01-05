import { type CreateState, type ExternalStoreApi, type TState } from './types';

export function createExternalStoreApi<State extends TState<State>>(
  createState: CreateState<State>,
): ExternalStoreApi<State> {
  type Listener = (state: State, prevState: State) => void;
  let state: State;
  const listeners = new Set<Listener>();

  const getState: ExternalStoreApi<State>['getState'] = () => state;

  const getServerState: ExternalStoreApi<State>['getServerState'] = () => state;

  const setState: ExternalStoreApi<State>['setState'] = (partial) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state =
        typeof nextState !== 'object' || nextState === null
          ? nextState
          : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const subscribe: ExternalStoreApi<State>['subscribe'] = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = createState(setState, getState, subscribe);
  return { setState, getState, getServerState, subscribe };
}
