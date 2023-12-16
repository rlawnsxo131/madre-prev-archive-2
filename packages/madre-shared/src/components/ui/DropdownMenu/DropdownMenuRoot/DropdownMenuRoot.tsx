import {
  // type MouseEvent,
  type PropsWithChildren,
} from 'react';

import { useRefEffect } from '../../../../hooks/useRefEffect';
import styles from './DropdownMenuRoot.module.scss';

type DropdownMenuRootProps = PropsWithChildren<{
  touchOutside: () => void;
}>;

export function DropdownMenuRoot({
  children,
  touchOutside,
}: DropdownMenuRootProps) {
  const ref = useRefEffect((el: HTMLDivElement) => {
    const handler = (e: MouseEvent) => {
      if (e.target && el.contains(e.target as Node)) {
        return;
      }
      touchOutside();
    };

    document.addEventListener('click', handler, true);
    () => {
      document.removeEventListener('click', handler, true);
    };
  }, []);

  return (
    <div ref={ref} className={styles.DropdownMenu}>
      {children}
    </div>
  );
}
