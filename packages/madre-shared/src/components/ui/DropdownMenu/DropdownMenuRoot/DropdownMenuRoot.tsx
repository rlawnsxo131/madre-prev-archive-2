import classNames from 'classnames';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import { useOnClickOutsideRef } from '../../../../hooks/useOnClickOutsideRef';
import styles from './DropdownMenuRoot.module.scss';

type DropdownMenuRootProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    onClickOutside: (e: MouseEvent) => void;
  }>;

export function DropdownMenuRoot({
  children,
  onClickOutside,
  className,
  ...props
}: DropdownMenuRootProps) {
  const ref = useOnClickOutsideRef<HTMLDivElement>(onClickOutside);

  return (
    <div
      ref={ref}
      className={classNames(styles.DropdownMenu, className)}
      {...props}
    >
      {children}
    </div>
  );
}
