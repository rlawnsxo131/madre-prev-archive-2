import { create } from 'zustand';

import { createExternalStoreApi } from './createExternalStoreApi';
import { type CreateState, type TState } from './types';
import { useExternalStore } from './useExternalStore';

// type ZustandExtractState<S> = S extends {
//   getState: () => infer T;
// }
//   ? T
//   : never;

export function createStore<State extends TState<State>>(
  createState: CreateState<State>,
) {
  const api = createExternalStoreApi(createState);

  return () => useExternalStore(api, api.getState);
  // return (selector) => useExternalStore(api, selector);
}

export const store = create<{ name: string; name2: string }>((set) => ({
  name: '',
  name2: '',
  setname: () => set({ name: 'aa' }),
}));

store();

const useStore = createStore<{ name: string; name2: string }>((set) => ({
  name: '',
  name2: '',
  setname: () => set({ name: 'aa' }),
}));

export function A() {
  const _1 = useStore((state) => ({ name: state.name }));
  // const _2 = useStore((state) => state.name);
  // const _3 = useStore((state) => ({ name2: state.name2 }));
  // const _4 = useStore((state) => ({ name: state.name, name2: state.name2 }));
}
