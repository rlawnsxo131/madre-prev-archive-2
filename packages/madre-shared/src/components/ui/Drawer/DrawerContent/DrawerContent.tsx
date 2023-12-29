import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import { Portal } from '../../../utility/Portal';
import { Overlay } from '../../Overlay';
import styles from './DrawerContent.module.scss';

export type DrawerContentProps = PropsWithChildren<{
  visible: boolean;
  duration?: number;
  className?: HTMLAttributes<HTMLUListElement>['className'];
}>;

export function DrawerContent({
  children,
  visible,
  duration = 0.15,
  className,
}: DrawerContentProps) {
  return (
    <>
      <Overlay visible={visible} />
      <Portal>
        <AnimatePresence>
          {visible && (
            <motion.ul
              className={classNames(styles.DrawerContent, className)}
              initial={{
                translateY: '100%',
                opacity: 0,
              }}
              animate={{
                translateY: 0,
                opacity: 1,
              }}
              exit={{
                translateY: '100%',
                opacity: 0,
              }}
              transition={{
                duration,
                ease: 'easeIn',
              }}
            >
              {children}
            </motion.ul>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
