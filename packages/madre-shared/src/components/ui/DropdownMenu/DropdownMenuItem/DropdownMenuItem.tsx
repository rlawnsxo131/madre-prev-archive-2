import classNames from 'classnames';
import { type HTMLAttributes } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import styles from './DropdownMenuItem.module.scss';

export function DropdownMenuItem({
  children,
  className,
  onClick,
  ...props
}: HTMLAttributes<HTMLLIElement>) {
  const { close } = useVisibleContext();

  return (
    <li
      className={classNames(styles.DropdownMenuItem, className)}
      onClick={(e) => {
        close();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </li>
  );
}
