import classNames from 'classnames';
import { cloneElement, type HTMLAttributes } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import { Slot } from '../../../utility/Slot';
import styles from './DropdownMenuItem.module.scss';

type DropdownMenuItemProps = {
  children: JSX.Element;
  className?: string;
  onClick?: () => void | Promise<void>;
};

export function DropdownMenuItem({
  children,
  className,
  onClick,
  ...props
}: DropdownMenuItemProps) {
  const { close } = useVisibleContext();

  return (
    <li className={classNames(styles.DropdownMenuItem, className)} {...props}>
      {cloneElement(children, {
        ['data-john']: '',
        onClick: () =>
          new Promise((resolve) => {
            if (onClick) {
              resolve(onClick());
            }
            resolve(true);
          })
            .then(() => children.props.onClick?.())
            .then(() => close()),
      })}
    </li>
  );
}
