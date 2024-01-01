import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import {
  Portal,
  type PortalProps as _PortalProps,
} from '../../../utility/Portal';
import styles from './DropdownMenuContent.module.scss';

type Props = PropsWithChildren<{
  align?: 'left' | 'right';
  duration?: number;
  isPortal?: boolean;
  portalProps?: Omit<_PortalProps, 'children'>;
  className?: string;
}>;

/**
 * @TODO focus 랑 key event 작업하기
 */
// const childrens = Children.map(children, (child: any, _) => {
//   return cloneElement(child, {
//     tabIndex: 0,
//   });
// });

export function DropdownMenuContent({
  children,
  align = 'left',
  duration = 0.15,
  isPortal,
  portalProps,
  className,
}: Props) {
  const { visible } = useVisibleContext();

  const Component = (
    <AnimatePresence>
      {visible && (
        <div className={styles.DropdownMenuContent} role="menu">
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
            {children}
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
