import classNames from 'classnames';
import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { useOutsideClickAndEscapeEventRef } from '../../../../hooks/useOutsideClickAndEscapeEventRef';
import { useDropdownMenuActions } from '../DropdownMenuProvider';
import styles from './DropdownMenuRoot.module.scss';

export function DropdownMenuRoot({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const { hide } = useDropdownMenuActions();
  const ref = useOutsideClickAndEscapeEventRef<HTMLDivElement>(hide);

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
