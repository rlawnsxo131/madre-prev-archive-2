/**
 * @TODO SSR 대응
 */
import {
  createContext,
  createElement,
  type ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react';

import { createExternalStoreApi } from './createExternalStoreApi';
import {
  type CreateState,
  type ExternalStoreApi,
  type StateSelector,
  type TState,
} from './types';
import { useExternalStore } from './useExternalStore';

export function createStoreContext<State extends TState<State>>(
  displayName?: string,
) {
  const StoreContext = createContext<ExternalStoreApi<State> | null>(null);
  StoreContext.displayName = displayName || 'StoreContext';

  const Provider = ({
    createState,
    children,
  }: {
    createState: CreateState<State>;
    children: ReactNode;
  }) => {
    const ref = useRef<ExternalStoreApi<State> | null>(null);

    if (!ref.current) {
      ref.current = createExternalStoreApi<State>(createState);
    }

    return createElement(
      StoreContext.Provider,
      {
        value: ref.current,
      },
      children,
    );
  };

  const useStoreContext = <T = State>(
    selector?: StateSelector<State, T>,
    isEqual?: (a: T, b: T) => boolean,
  ) => {
    const context = useContext(StoreContext);

    if (!context) {
      throw new Error(`not found ${StoreContext.displayName}`);
    }

    return useExternalStore(context, selector, isEqual);
  };

  const useStoreContextApi = () => {
    const context = useContext(StoreContext);

    if (!context) {
      throw new Error(`not found storeContext`);
    }

    return useMemo(() => ({ ...context }), [context]);
  };

  return {
    Provider,
    useStoreContext,
    useStoreContextApi,
  };
}
