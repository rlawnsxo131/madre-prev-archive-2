export type TState<S> = { [K in keyof S]: S[K] };

export type StateSelector<S, U> = (state: S) => U;

export type StoreApi<S> = {
  setState: (
    partial:
      | ((state: S) => S)
      | ((state: Partial<S>) => Partial<S>)
      | Partial<S>,
  ) => void;
  getState: () => S;
  getServerState: () => S;
  subscribe: (listener: (state: S, prevState: S) => void) => () => boolean;
};

export type CreateState<S> = (
  setState: StoreApi<S>['setState'],
  getState: StoreApi<S>['getState'],
  subscribe: StoreApi<S>['subscribe'],
) => S;

export type ExternalStoreApi<S> = {
  setState: (partial: (state: S) => S) => void;
  getState: () => S;
  getServerState: () => S;
  subscribe: (listener: (state: S, prevState: S) => void) => () => boolean;
};
