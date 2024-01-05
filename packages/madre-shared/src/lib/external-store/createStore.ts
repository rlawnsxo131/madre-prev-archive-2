import { createExternalStoreApi } from './createExternalStoreApi';
import { type CreateState, type StateSelector, type TState } from './types';
import { useExternalStore } from './useExternalStore';

export function createStore<State extends TState<State>>(
  createState: CreateState<State>,
) {
  const api = createExternalStoreApi(createState);

  return <T = State>(
    selector?: StateSelector<State, T>,
    isEqual?: (a: T, b: T) => boolean,
  ) => useExternalStore(api, selector, isEqual);
}
