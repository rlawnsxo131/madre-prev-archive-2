import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

import { createExternalStoreApi } from './createExternalStoreApi';
import { type ExternalStoreApi, type TState } from './types';

export function useExternalStore<State extends TState<State>, T>(
  api: ExternalStoreApi<State>,
  selector: (state: State) => T = api.getState,
  isEqual?: (a: T, b: T) => boolean,
) {
  const state = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState,
    selector,
    isEqual,
  );

  return state;
}

const store = createExternalStoreApi(() => ({
  name: '1',
}));

export function A() {
  const _ = useExternalStore(store, (state) => ({ name1: state.name }));
}
