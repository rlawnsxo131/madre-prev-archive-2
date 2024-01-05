import classNames from 'classnames';
import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { useVisibleActions } from '../../../../contexts/VisibleContext';
import styles from './DrawerTrigger.module.scss';

export function DrawerTrigger({
  children,
  className,
  onClick,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const { toggle } = useVisibleActions();

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
