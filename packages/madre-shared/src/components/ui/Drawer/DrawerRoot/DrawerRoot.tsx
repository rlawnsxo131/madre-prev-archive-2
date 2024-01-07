import classNames from 'classnames';
import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { useVisibleActions } from '../../../../contexts/VisibleContext';
import { useOutsideClickAndEscapeRefEffect } from '../../../../hooks/useOutsideClickAndEscapeRefEffect';
import styles from './DrawerRoot.module.scss';

export function DrawerRoot({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const { hide } = useVisibleActions();
  const ref = useOutsideClickAndEscapeRefEffect(hide);

  return (
    <div
      ref={ref}
      className={classNames(styles.DrawerRoot, className)}
      {...props}
    >
      {children}
    </div>
  );
}
