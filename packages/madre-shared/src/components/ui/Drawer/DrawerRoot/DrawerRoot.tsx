import classNames from 'classnames';
import { type HTMLAttributes } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import { useOutsideClickAndEscape } from '../../../../hooks/useOutsideClickAndEscape';
import styles from './DrawerRoot.module.scss';

export function DrawerRoot({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { close } = useVisibleContext();
  const ref = useOutsideClickAndEscape(close);

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
