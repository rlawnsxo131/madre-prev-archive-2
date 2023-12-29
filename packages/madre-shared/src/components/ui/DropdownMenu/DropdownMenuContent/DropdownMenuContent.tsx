import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Children,
  cloneElement,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';

import {
  Portal,
  type PortalProps as _PortalProps,
} from '../../../utility/Portal';
import styles from './DropdownMenuContent.module.scss';

type DropdownMenuContentProps = PropsWithChildren<{
  visible: boolean;
  align?: 'left' | 'right';
  duration?: number;
  isPortal?: boolean;
  portalProps?: Omit<_PortalProps, 'children'>;
  className?: HTMLAttributes<HTMLUListElement>['className'];
}>;

/**
 * @TODO focus 랑 key event 작업하기
 */

// const keydownHander = (e: KeyboardEvent) => {
//   if (e.target && el.contains(e.target as Node)) {
//     return;
//   }
//   if (e.key !== 'Enter') return;
//   event();
// };

// document.removeEventListener('keydown', keydownHander);
export function DropdownMenuContent({
  children,
  visible,
  align = 'left',
  duration = 0.15,
  isPortal,
  portalProps,
  className,
}: DropdownMenuContentProps) {
  const childrens = Children.map(children, (child: any, _) => {
    return cloneElement(child, {
      tabIndex: 0,
    });
  });

  const Component = (
    <AnimatePresence>
      {visible && (
        <div className={styles.DropdownMenuContent}>
          <motion.ul
            className={classNames(styles.items, styles[align], className)}
            initial={{
              translateY: 0,
              opacity: 0,
            }}
            animate={{
              translateY: 1,
              opacity: 1,
            }}
            exit={{
              translateY: 0,
              opacity: 0,
            }}
            transition={{
              duration,
              ease: 'easeIn',
            }}
          >
            {childrens}
          </motion.ul>
        </div>
      )}
    </AnimatePresence>
  );

  if (isPortal) {
    return <Portal {...portalProps}>{Component}</Portal>;
  }

  return Component;
}
