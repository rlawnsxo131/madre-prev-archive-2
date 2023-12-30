import classNames from 'classnames';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import { Slot } from '../../../utility/Slot';
import styles from './DropdownMenuItem.module.scss';

type DropdownMenuItemProps = {
  children: JSX.Element;
  className?: string;
  onClick?: (e: any) => void;
};

export function DropdownMenuItem({
  children,
  className,
  onClick,
  ...props
}: DropdownMenuItemProps) {
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
