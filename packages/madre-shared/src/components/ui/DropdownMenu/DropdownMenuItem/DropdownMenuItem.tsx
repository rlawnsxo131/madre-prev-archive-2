import classNames from 'classnames';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import styles from './DropdownMenuItem.module.scss';

type DropdownMenuItemProps = HTMLAttributes<HTMLLIElement> & PropsWithChildren;

export function DropdownMenuItem({
  children,
  className,
  ...props
}: DropdownMenuItemProps) {
  return (
    <li className={classNames(styles.DropdownMenuItem, className)} {...props}>
      {children}
    </li>
  );
}
