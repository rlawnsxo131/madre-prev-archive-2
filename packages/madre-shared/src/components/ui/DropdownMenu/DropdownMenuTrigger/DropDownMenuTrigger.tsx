import classNames from 'classnames';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import styles from './DropdownMenuTrigger.module.scss';

export function DropdownMenuTrigger({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & PropsWithChildren) {
  return (
    <div
      className={classNames(styles.DropdownMenuTrigger, className)}
      {...props}
    >
      {children}
    </div>
  );
}
