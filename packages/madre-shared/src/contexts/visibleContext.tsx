import {
  type Context,
  type ContextType,
  createContext,
  type PropsWithChildren,
  useContext,
} from 'react';

import { useBoolState } from '../hooks/useBoolState';

export type VisibleContextType = Context<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
} | null>;

export type VisibleContextElement = (
  props: NonNullable<ContextType<VisibleContextType>>,
) => JSX.Element;

const VisibleContext: VisibleContextType = createContext<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
} | null>(null);

function ContextProvider({ children }: PropsWithChildren) {
  const { bool, actions } = useBoolState();

  return (
    <VisibleContext.Provider
      value={{
        visible: bool,
        setVisible: actions.setValue,
        open: actions.setTrue,
        close: actions.setFalse,
        toggle: actions.toggle,
      }}
    >
      {children}
    </VisibleContext.Provider>
  );
}

function ContextController({
  children: Element,
}: {
  children: VisibleContextElement;
}) {
  const context = useContext(VisibleContext);

  if (!context) {
    throw new Error(
      'Component is only available within VisibleContextProvider',
    );
  }

  return <Element {...context} />;
}

export function createVisibleContextProvider() {
  return function ({ children: Element }: { children: VisibleContextElement }) {
    return (
      <ContextProvider>
        <ContextController>
          {(props) => <Element {...props} />}
        </ContextController>
      </ContextProvider>
    );
  };
}
