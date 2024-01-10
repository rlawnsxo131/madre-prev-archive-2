import classNames from 'classnames';
import {
  Children,
  cloneElement,
  forwardRef,
  type PropsWithoutRef,
} from 'react';

import { useDrawerActions } from '../DrawerProvider';
import styles from './DrawerItem.module.scss';

export const DrawerItem = forwardRef<
  HTMLLIElement,
  PropsWithoutRef<{ children: JSX.Element; className?: string }>
>(({ children, className }, ref) => {
  const child = Children.only(children);
  const { hide } = useDrawerActions();

  return (
    <li ref={ref} className={classNames(styles.DrawerItem, className)}>
      {cloneElement(children, {
        role: 'menuitem',
        onClick: () =>
          Promise.resolve(child.props.onClick?.()).then(() => hide()),
      })}
    </li>
  );
});
