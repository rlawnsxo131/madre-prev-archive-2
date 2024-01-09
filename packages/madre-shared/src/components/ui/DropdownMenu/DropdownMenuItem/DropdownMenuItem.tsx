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
  const { hide } = useDropdownMenuActions();

  return (
    <li ref={ref} className={classNames(styles.DropdownMenuItem, className)}>
      {cloneElement(children, {
        onClick: () =>
          Promise.resolve(child.props.onClick?.()).then(() => hide()),
      })}
    </li>
  );
});
