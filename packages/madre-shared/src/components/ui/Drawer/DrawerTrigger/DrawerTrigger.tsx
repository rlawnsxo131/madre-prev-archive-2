import classNames from 'classnames';
import { type HTMLAttributes } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import styles from './DrawerTrigger.module.scss';

export function DrawerTrigger({
  children,
  className,
  onClick,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { toggle } = useVisibleContext();

  return (
    <div
      className={classNames(styles.DrawerTrigger, className)}
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
