import classNames from 'classnames';
import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import { useOutsideClickAndEscapeRefEffect } from '../../../../hooks/useOutsideClickAndEscapeRefEffect';
import styles from './DropdownMenuRoot.module.scss';

export function DropdownMenuRoot({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const [, { close }] = useVisibleContext();
  const ref = useOutsideClickAndEscapeRefEffect<HTMLDivElement>(close);

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
