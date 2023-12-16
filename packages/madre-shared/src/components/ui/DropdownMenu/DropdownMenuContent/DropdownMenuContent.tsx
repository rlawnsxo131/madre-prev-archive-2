import { AnimatePresence, motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

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
    visible: boolean;
    duration?: number;
  }>;

/**
 * @TODO Portal
 */
export function DropdownMenuContent({
  children,
  visible,
  duration = 0.15,
  isPortal,
  portalProps,
}: DropdownMenuContentProps) {
  const Comp = (
    <AnimatePresence>
      {visible && (
        <div className={styles.DropdownMenuContent}>
          <motion.ul
            className={styles.items}
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
