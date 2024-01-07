import { type ReactNode, useMemo, useState } from 'react';

import { makeContext } from './makeContext';

type State = {
  visible: boolean;
};

type Actions = {
  set: (visible: boolean) => void;
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

const { Provider: StateProvider, useContext: useStateContext } =
  makeContext<State>('VisibleStateContext');

const { Provider: ActionsProvider, useContext: useActionsContext } =
  makeContext<Actions>('VisibleStateContext');

export function VisibleProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  const actions = useMemo<Actions>(
    () => ({
      set: setVisible,
      show: () => setVisible(true),
      hide: () => setVisible(false),
      toggle: () => setVisible((prev) => !prev),
    }),
    [],
  );

  return (
    <StateProvider
      value={{
        visible,
      }}
    >
      <ActionsProvider value={actions}>{children}</ActionsProvider>
    </StateProvider>
  );
}

export function useVisible() {
  const state = useStateContext();
  const actions = useActionsContext();
  return { state, actions };
}

export function useVisibleState() {
  return useStateContext();
}

export function useVisibleActions() {
  return useActionsContext();
}
