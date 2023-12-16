import { type PropsWithChildren } from 'react';

import styles from './DropdownMenuTrigger.module.scss';

export function DropdownMenuTrigger({ children }: PropsWithChildren) {
  return <div className={styles.DropdownMenuTrigger}>{children}</div>;
}
