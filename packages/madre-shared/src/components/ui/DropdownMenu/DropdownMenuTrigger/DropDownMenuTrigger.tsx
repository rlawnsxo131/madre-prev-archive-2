import type { PropsWithChildren } from 'react';

import styles from './DropdownMenuTrigger.module.scss';

type DropdownMenuTriggerProps = PropsWithChildren;

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  return <div className={styles.DropdownMenuTrigger}>{children}</div>;
}
