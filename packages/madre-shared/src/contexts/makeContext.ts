import * as React from 'react';

/**
 * @description React context api 를 조금더 편하게 사용하기 위한 함수입니다.
 *
 * @param displayName - Context 의 displayName 으로 사용될 값.
 *
 */
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
