import classNames from 'classnames';
import {
  Children,
  cloneElement,
  forwardRef,
  type PropsWithoutRef,
} from 'react';

import { useDropdownMenuActions } from '../DropdownMenuProvider';
import styles from './DropdownMenuItem.module.scss';

export const DropdownMenuItem = forwardRef<
  HTMLLIElement,
  PropsWithoutRef<{
    children: JSX.Element;
    className?: string;
  }>
>(({ children, className }, ref) => {
  const child = Children.only(children);
  const { close } = useDropdownMenuActions();

  return (
    <li ref={ref} className={classNames(styles.DropdownMenuItem, className)}>
      {cloneElement(children, {
        role: 'menuitem',
        onClick: () => {
          close();
          child.props.onClick?.();
        },
      })}
    </li>
  );
});
