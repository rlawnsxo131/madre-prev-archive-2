import classNames from 'classnames';
import { type HTMLAttributes } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import styles from './DropdownMenuTrigger.module.scss';

export function DropdownMenuTrigger({
  children,
  className,
  onClick,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { toggle } = useVisibleContext();

  return (
    <div
      className={classNames(styles.DropdownMenuTrigger, className)}
      onClick={(e) => {
        toggle();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </div>
  );
}
