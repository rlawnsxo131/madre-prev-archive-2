import { type ReactNode, useState } from 'react';

import { makeContext } from './makeContext';

const { Provider, useContext } = makeContext<{
  visible: boolean;
  actions: {
    set: (visible: boolean) => void;
    show: () => void;
    hide: () => void;
    toggle: () => void;
  };
}>('VisibleContext');

export function VisibleProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <Provider
      value={{
        visible,
        actions: {
          set: setVisible,
          show: () => setVisible(true),
          hide: () => setVisible(false),
          toggle: () => setVisible((prev) => !prev),
        },
      }}
    >
      {children}
    </Provider>
  );
}

export function useVisible() {
  return useContext();
}
