import classNames from 'classnames';
import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { useOutsideClickAndEscapeEventRef } from '../../../../hooks/useOutsideClickAndEscapeEventRef';
import { useVisibleActions } from '../../../../providers/VisibleProvider';
import styles from './DrawerRoot.module.scss';

export function DrawerRoot({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const { hide } = useVisibleActions();
  const ref = useOutsideClickAndEscapeEventRef(hide);

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
