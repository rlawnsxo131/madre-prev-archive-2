import classNames from 'classnames';
import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import styles from './DrawerItem.module.scss';

export function DrawerItem({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={classNames(styles.DrawerItem, className)} {...props}>
      {children}
    </div>
  );
}
