import {
  type Context,
  type ContextType,
  createContext,
  type ReactNode,
  useContext,
} from 'react';

import { useBoolState } from '../../hooks/useBoolState';

export type VisibleContextValue = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
} | null;

export type VisibleContext = ContextType<Context<VisibleContextValue>>;

export type VisibleContextElement = (
  props: NonNullable<VisibleContext>,
) => JSX.Element;

class _VisibleContextGenerator {
  #context: Context<VisibleContextValue>;

  constructor() {
    this.#context = createContext<VisibleContextValue>(null);
  }

  excute() {
    const Provider = this.#createProvider();
    const Controller = this.#createController();

    return function ({
      children: Element,
    }: {
      children: VisibleContextElement;
    }) {
      return (
        <Provider>
          <Controller>{(props) => <Element {...props} />}</Controller>
        </Provider>
      );
    };
  }

  #createProvider() {
    const Context = this.#context;

    return function ({ children }: { children: ReactNode }) {
      const { bool, actions } = useBoolState();

      return (
        <Context.Provider
          value={{
            visible: bool,
            setVisible: actions.setValue,
            open: actions.setTrue,
            close: actions.setFalse,
            toggle: actions.toggle,
          }}
        >
          {children}
        </Context.Provider>
      );
    };
  }

  #createController() {
    const Context = this.#context;

    return function ({
      children: Element,
    }: {
      children: VisibleContextElement;
    }) {
      const context = useContext(Context);

      if (!context) {
        throw new Error(
          'Component is only available within VisibleContextProvider',
        );
      }

      return <Element {...context} />;
    };
  }
}

export const VisibleContextGenerator = new _VisibleContextGenerator();
