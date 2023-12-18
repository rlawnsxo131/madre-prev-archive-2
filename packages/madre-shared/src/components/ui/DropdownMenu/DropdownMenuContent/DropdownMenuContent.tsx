import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import {
  Portal,
  type PortalProps as _PortalProps,
} from '../../../utility/Portal';
import styles from './DropdownMenuContent.module.scss';

type PortalProps =
  | {
      isPortal?: never;
      portalProps?: never;
    }
  | {
      isPortal: true;
      portalProps: Omit<_PortalProps, 'children'>;
    };

type DropdownMenuContentProps = PortalProps &
  PropsWithChildren<{
    className?: HTMLAttributes<HTMLUListElement>['className'];
    style?: HTMLAttributes<HTMLUListElement>['style'];
    visible: boolean;
    align?: 'left' | 'right';
    duration?: number;
  }>;

export function DropdownMenuContent({
  children,
  className,
  style,
  visible,
  align = 'left',
  duration = 0.15,
  isPortal,
  portalProps,
}: DropdownMenuContentProps) {
  const Comp = (
    <AnimatePresence>
      {visible && (
        <div className={styles.DropdownMenuContent}>
          <motion.ul
            className={classNames(styles.items, styles[align], className)}
            style={style}
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
    return <Portal {...portalProps}>{Comp}</Portal>;
  }

  return Comp;
}
