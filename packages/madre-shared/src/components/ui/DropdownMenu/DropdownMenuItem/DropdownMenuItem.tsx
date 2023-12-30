import classNames from 'classnames';
import { type HTMLAttributes } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import { Slot } from '../../../utility/Slot';
import styles from './DropdownMenuItem.module.scss';

export function DropdownMenuItem({
  children,
  className,
  onClick,
  ...props
}: HTMLAttributes<HTMLLIElement> & {
  children: JSX.Element;
}) {
  const { close } = useVisibleContext();

  return (
    <li
      className={classNames(styles.DropdownMenuItem, className)}
      onClick={(e) => {
        close();
        onClick?.(e);
      }}
      {...props}
    >
      <Slot {...{ ['data-john']: '' }}>{children}</Slot>
    </li>
  );
}
