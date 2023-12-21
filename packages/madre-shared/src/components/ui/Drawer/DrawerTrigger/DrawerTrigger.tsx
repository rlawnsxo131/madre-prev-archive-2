import classNames from 'classnames';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import styles from './DrawerTrigger.module.scss';

export function DrawerTrigger({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & PropsWithChildren) {
  return (
    <div className={classNames(styles.DrawerTrigger, className)} {...props}>
      {children}
    </div>
  );
}
