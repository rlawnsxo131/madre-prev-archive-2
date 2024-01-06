import classNames from 'classnames';
import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { useOutsideClickAndEscapeRefEffect } from '../../../../hooks/useOutsideClickAndEscapeRefEffect';
import { useVisible } from '../../../../contexts/VisibleContext';
import styles from './DrawerRoot.module.scss';

export function DrawerRoot({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const {
    actions: { hide },
  } = useVisible();
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
