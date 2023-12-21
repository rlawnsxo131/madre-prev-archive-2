import classNames from 'classnames';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import { useOnClickOutsideRef } from '../../../../hooks/useOnClickOutsideRef';
import styles from './DrawerRoot.module.scss';

type DrawerRootProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    onClickOutside: () => void;
  }>;

export function DrawerRoot({
  children,
  onClickOutside,
  className,
  ...props
}: DrawerRootProps) {
  const ref = useOnClickOutsideRef<HTMLDivElement>(onClickOutside);

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
