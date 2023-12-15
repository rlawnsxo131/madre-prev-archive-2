import type { ContextType, PropsWithChildren } from 'react';
import { createContext, useState } from 'react';
import { useContext } from 'react';

const DropdownMenuContext = createContext<{
  visible: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
} | null>(null);

function DropdownMenuProvider({ children }: PropsWithChildren) {
  const [visible, setVisible] = useState(false);

  return (
    <DropdownMenuContext.Provider
      value={{
        visible,
        open: () => setVisible(true),
        close: () => setVisible(false),
        toggle: () => setVisible((visible) => !visible),
      }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}

export type DropdownMenuElement = (
  props: NonNullable<ContextType<typeof DropdownMenuContext>>,
) => JSX.Element;

function DropdownMenuController({
  children: Element,
}: {
  children: DropdownMenuElement;
}) {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error('DropdownMenu is only available within OverlayProvider.');
  }

  return <Element {...context} />;
}

export function DropdownMenuContainer({
  children: Element,
}: {
  children: DropdownMenuElement;
}) {
  return (
    <DropdownMenuProvider>
      <DropdownMenuController>
        {(props) => <Element {...props} />}
      </DropdownMenuController>
    </DropdownMenuProvider>
  );
}
