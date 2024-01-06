import classNames from 'classnames';
import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { useOutsideClickAndEscapeRefEffect } from '../../../../hooks/useOutsideClickAndEscapeRefEffect';
import { useVisible } from '../../../../contexts/VisibleContext';
import styles from './DropdownMenuRoot.module.scss';

export function DropdownMenuRoot({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const {
    actions: { hide },
  } = useVisible();
  const ref = useOutsideClickAndEscapeRefEffect<HTMLDivElement>(hide);

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
