import classNames from 'classnames';
import { type HTMLAttributes } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import { useOutsideClickAndEscape } from '../../../../hooks/useOutsideClickAndEscape';
import styles from './DropdownMenuRoot.module.scss';

export function DropdownMenuRoot({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { close } = useVisibleContext();
  const ref = useOutsideClickAndEscape<HTMLDivElement>(close);

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
