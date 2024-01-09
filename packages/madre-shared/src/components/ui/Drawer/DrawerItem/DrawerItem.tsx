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
  HTMLDivElement,
  PropsWithoutRef<{ children: JSX.Element; className?: string }>
>(({ children, className }, ref) => {
  const child = Children.only(children);
  const { hide } = useDrawerActions();

  return (
    <div ref={ref} className={classNames(styles.DrawerItem, className)}>
      {cloneElement(children, {
        onClick: () =>
          Promise.resolve(child.props.onClick?.()).then(() => hide()),
      })}
    </div>
  );
});
