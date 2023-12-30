import {
  createContext,
  // type ElementRef,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useRef,
} from 'react';

// type ItemData = { disabled: boolean; textValue: string };
// type a = ElementRef<typeof Primitive.div>;

export type CollectionContextValue = {
  collectionRef: RefObject<HTMLElement>;
  itemMap: Map<
    RefObject<HTMLElement>,
    {
      ref: RefObject<HTMLElement>;
      disabled: boolean;
    }
  >;
};

const CollectionContext = createContext<CollectionContextValue | null>(null);

export function CollectionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const collectionRef = useRef<HTMLElement>(null);
  const itemMap = useRef<CollectionContextValue['itemMap']>(new Map()).current;

  return (
    <CollectionContext.Provider
      value={{
        collectionRef,
        itemMap,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollectionContext() {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error(
      'useCollectionContext should be used within CollectionContextProvider',
    );
  }

  return context;
}

export function useCollection() {
  const context = useCollectionContext();

  const getItems = useCallback(() => {
    const collectionNode = context.collectionRef.current;
    if (!collectionNode) return [];

    const orderedNodes = Array.from(collectionNode.querySelectorAll(`[]`)); // ${ITEM_DATA_ATTR}
    const items = Array.from(context.itemMap.values());
    const orderedItems = items.sort(
      (a, b) =>
        orderedNodes.indexOf(a.ref.current!) -
        orderedNodes.indexOf(b.ref.current!),
    );
    return orderedItems;
  }, [context]);

  return {
    getItems,
  };
}
