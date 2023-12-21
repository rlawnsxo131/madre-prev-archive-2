import classNames from 'classnames';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import styles from './DropdownMenuItem.module.scss';

export function DropdownMenuItem({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLLIElement> & PropsWithChildren) {
  return (
    <li className={classNames(styles.DropdownMenuItem, className)} {...props}>
      {children}
    </li>
  );
}
