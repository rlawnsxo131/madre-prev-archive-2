import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import styles from './DropdownMenuRoot.module.scss';

export const DropdownMenuRoot = forwardRef<HTMLDivElement, PropsWithChildren>(
  function ({ children }, rootRef) {
    return (
      <div ref={rootRef} className={styles.DropdownMenu}>
        {children}
      </div>
    );
  },
);
