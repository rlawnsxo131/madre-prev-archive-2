import classNames from 'classnames';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import styles from './DrawerItem.module.scss';

export function DrawerItem({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & PropsWithChildren) {
  return (
    <div className={classNames(styles.DrawerItem, className)} {...props}>
      {children}
    </div>
  );
}
