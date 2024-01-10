import classNames from 'classnames';
import {
  Children,
  cloneElement,
  forwardRef,
  type PropsWithoutRef,
} from 'react';

import { useDrawerActions } from '../DrawerProvider';
import styles from './DrawerTrigger.module.scss';

export const DrawerTrigger = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<{ children: JSX.Element; className?: string }>
>(({ children, className }, ref) => {
  const child = Children.only(children);
  const { toggle } = useDrawerActions();

  return (
    <div ref={ref} className={classNames(styles.DrawerTrigger, className)}>
      {cloneElement(children, {
        ['aria-label']: '메뉴 열기',
        ['aria-haspopup']: 'menu',
        onClick: () => {
          toggle();
          child.props.onClick?.();
        },
      })}
    </div>
  );
});
