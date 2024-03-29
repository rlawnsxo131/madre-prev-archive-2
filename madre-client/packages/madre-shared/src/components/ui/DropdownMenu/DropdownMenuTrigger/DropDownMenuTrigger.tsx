import classNames from 'classnames';
import {
  Children,
  cloneElement,
  forwardRef,
  type MouseEvent,
  type PropsWithoutRef,
} from 'react';

import { useDropdownMenuActions } from '../DropdownMenuProvider';
import styles from './DropdownMenuTrigger.module.scss';

export const DropdownMenuTrigger = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<{
    children: JSX.Element;
    className?: string;
  }>
>(({ children, className }, ref) => {
  const child = Children.only(children);
  const { toggle } = useDropdownMenuActions();

  return (
    <div
      ref={ref}
      className={classNames(styles.DropdownMenuTrigger, className)}
    >
      {cloneElement(children, {
        ['aria-label']: '메뉴 열기',
        ['aria-haspopup']: 'menu',
        onClick: (e: MouseEvent) => {
          toggle();
          child.props.onClick?.(e);
          ((e.target || e.currentTarget) as any)?.blur();
        },
      })}
    </div>
  );
});
