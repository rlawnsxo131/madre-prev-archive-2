import classNames from 'classnames';
import {
  Children,
  cloneElement,
  forwardRef,
  type PropsWithoutRef,
} from 'react';

import { useAccordionActions } from '../AccordionProvider';
import styles from './AccordionTrigger.module.scss';

export const AccordionTrigger = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<{ children: JSX.Element; className?: string }>
>(({ children, className }, ref) => {
  const child = Children.only(children);
  const { toggle } = useAccordionActions();

  return (
    <div ref={ref} className={classNames(styles.AccordionTrigger, className)}>
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
