import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

import { Portal } from '../../../utility/Portal';
import {
  useDropdownMenuOptions,
  useDropdownMenuState,
} from '../DropdownMenuProvider';
import styles from './DropdownMenuContent.module.scss';

type Props = PropsWithChildren<{
  className?: string;
}>;

export function DropdownMenuContent({ children, className }: Props) {
  const { visible } = useDropdownMenuState();
  const { align, duration, isPortal, portalProps } = useDropdownMenuOptions();

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
