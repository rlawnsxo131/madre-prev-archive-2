import classNames from 'classnames';
import { forwardRef, type PropsWithoutRef } from 'react';

import styles from './DrawerItem.module.scss';

export const DrawerItem = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<{ children: JSX.Element; className?: string }>
>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={classNames(styles.DrawerItem, className)}>
      {children}
    </div>
  );
});
