import type { PropsWithChildren } from 'react';

import styles from './DropDownMenu.module.scss';

type DropDownMenuProps = PropsWithChildren;

export const DropDownMenu = Object.assign(
  ({ children }: DropDownMenuProps) => (
    <div className={styles.DropDownMenu}>{children}</div>
  ),
  {
    Trigger: () => <div>trigger</div>,
    Content: () => <div>Content</div>,
    Item: () => <div>Item</div>,
  },
);
