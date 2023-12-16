import { type PropsWithChildren } from 'react';

import styles from './DropdownMenuItem.module.scss';

type DropdownMenuItemProps = PropsWithChildren;

export function DropdownMenuItem({ children }: DropdownMenuItemProps) {
  return <li className={styles.DropdownMenuItem}>{children}</li>;
}
