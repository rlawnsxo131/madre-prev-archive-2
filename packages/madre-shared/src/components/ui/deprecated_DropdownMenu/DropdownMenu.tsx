import type { PropsWithChildren } from 'react';

import styles from './DropdownMenu.module.scss';
import { DropdownMenuContent } from './DropdownMenuContent/DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem/DropdownMenuItem';
import { DropdownMenuProvider } from './DropdownMenuProvider';
import { DropdownMenuTrigger } from './DropdownMenuTrigger/DropDownMenuTrigger';

type DropdownMenuProps = PropsWithChildren;

export const DropdownMenu = Object.assign(
  ({ children }: DropdownMenuProps) => (
    <DropdownMenuProvider>
      <div className={styles.DropdownMenu}>{children}</div>
    </DropdownMenuProvider>
  ),
  {
    Trigger: DropdownMenuTrigger,
    Content: DropdownMenuContent,
    Item: DropdownMenuItem,
  },
);
