import type { ReactNode } from 'react';
import { useContext } from 'react';

import { DropdownMenuContext } from '../DropdownMenuProvider';
import styles from './DropdownMenuTrigger.module.scss';

type DropdownMenuTriggerProps = {
  children: (props: { onClick: () => void }) => ReactNode;
};

export function DropdownMenuTrigger({
  children: Element,
}: DropdownMenuTriggerProps) {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error(
      'DropdownMenu is only available within DropdownMenuProvider.',
    );
  }

  console.log(context.visible);

  return (
    <div className={styles.DropdownMenuTrigger}>
      <Element onClick={context.toggle} />
    </div>
  );
}
