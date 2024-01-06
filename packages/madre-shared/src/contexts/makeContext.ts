import * as React from 'react';

export function makeContext<Value extends { [K in keyof Value]: Value[K] }>(
  displayName?: string,
) {
  const Context = React.createContext<Value | null>(null);
  Context.displayName = displayName ?? 'MakeContext';

  const Provider = ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: Value;
  }) => {
    return React.createElement(Context.Provider, { value }, children);
  };

  const useContext = () => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(`not found ${Context.displayName}`);
    }
    return context;
  };

  return {
    Provider,
    useContext,
  };
}
