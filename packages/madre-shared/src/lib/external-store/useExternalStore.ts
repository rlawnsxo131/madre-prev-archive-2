import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

import { createExternalStoreApi } from './createExternalStoreApi';
import { type ExternalStoreApi, type TState } from './types';

export function useExternalStore<State extends TState<State>, ExtractState>(
  api: ExternalStoreApi<State>,
  selector: (state: State) => ExtractState = api.getState,
  isEqual?: (a: ExtractState, b: ExtractState) => boolean,
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
