import { createContext, type ReactNode, useContext, useState } from 'react';

const VisibleContext = createContext<{
  visible: boolean;
  setVisible: (value: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
} | null>(null);

export function VisibleContextProvider({ children }: { children: ReactNode }) {
  const [bool, setBool] = useState(false);

  return (
    <VisibleContext.Provider
      value={{
        visible: bool,
        setVisible: (value: boolean) => setBool(value),
        open: () => setBool(true),
        close: () => setBool(false),
        toggle: () => setBool((prev) => !prev),
      }}
    >
      {children}
    </VisibleContext.Provider>
  );
}

export function useVisibleContext() {
  const context = useContext(VisibleContext);

  if (!context) {
    throw new Error(
      'useVisibleContext should be used within VisibleContextProvider',
    );
  }

  return context;
}
