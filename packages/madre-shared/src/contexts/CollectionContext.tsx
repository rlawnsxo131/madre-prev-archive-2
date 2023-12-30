import { createContext, type ReactNode, useContext } from 'react';

const CollectionContext = createContext<null>(null);

export function CollectionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CollectionContext.Provider value={null}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollectionContext() {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error(
      'useCollectionContext should be used within VisibleContextProvider',
    );
  }

  return context;
}
