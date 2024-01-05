export type TState<S> = { [K in keyof S]: S[K] };

export type ExtractStateSelector<T, U> = (state: T) => U;

export type StoreApi<T> = {
  setState: (
    partial:
      | ((state: T) => T)
      | ((state: Partial<T>) => Partial<T>)
      | Partial<T>,
  ) => void;
  getState: () => T;
  getServerState: () => T;
  subscribe: (listener: (state: T, prevState: T) => void) => () => boolean;
};

export type CreateState<U> = (
  setState: StoreApi<U>['setState'],
  getState: StoreApi<U>['getState'],
  subscribe: StoreApi<U>['subscribe'],
) => U;

export type ExternalStoreApi<State> = {
  setState: (partial: (state: State) => State) => void;
  getState: () => State;
  getServerState: () => State;
  subscribe: (
    listener: (state: State, prevState: State) => void,
  ) => () => boolean;
};
