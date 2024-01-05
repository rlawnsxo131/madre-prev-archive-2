export type TState<S> = { [K in keyof S]: S[K] };

export type StateSelector<S, U> = (state: S) => U;

export type ExternalStoreApi<S> = {
  setState: (
    partial: S | Partial<S> | { _(state: S): S | Partial<S> }['_'],
  ) => void;
  getState: () => S;
  getServerState: () => S;
  subscribe: (listener: (state: S, prevState: S) => void) => () => boolean;
};

export type CreateState<S> = (
  setState: ExternalStoreApi<S>['setState'],
  getState: ExternalStoreApi<S>['getState'],
  subscribe: ExternalStoreApi<S>['subscribe'],
) => S;
