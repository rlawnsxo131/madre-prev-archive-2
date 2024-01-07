import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

import { useVisibleState } from '../../../../contexts/VisibleContext';
import { Portal } from '../../../utility/Portal';
import { Overlay } from '../../Overlay';
import styles from './DrawerContent.module.scss';

const motionMap = {
  top: {
    initial: {
      translateY: '-100%',
      opacity: 0,
    },
    animate: {
      translateY: 0,
      opacity: 1,
    },
    exit: {
      translateY: '-100%',
      opacity: 0,
    },
  },
  right: {
    initial: {
      translateX: '100%',
      opacity: 0,
    },
    animate: {
      translateX: 0,
      opacity: 1,
    },
    exit: {
      translateX: '100%',
      opacity: 0,
    },
  },
  bottom: {
    initial: {
      translateY: '100%',
      opacity: 0,
    },
    animate: {
      translateY: 0,
      opacity: 1,
    },
    exit: {
      translateY: '100%',
      opacity: 0,
    },
  },
  left: {
    initial: {
      translateX: '-100%',
      opacity: 0,
    },
    animate: {
      translateX: 0,
      opacity: 1,
    },
    exit: {
      translateX: '-100%',
      opacity: 0,
    },
  },
};

type Props = PropsWithChildren<{
  position?: 'top' | 'right' | 'bottom' | 'left';
  duration?: number;
  className?: string;
}>;

export function DrawerContent({
  children,
  position = 'bottom',
  duration = 0.15,
  className,
}: Props) {
  const { visible } = useVisibleState();

  return (
    <>
      <Overlay visible={visible} />
      <Portal>
        <AnimatePresence>
          {visible && (
            <motion.ul
              className={classNames(
                styles.DrawerContent,
                styles[position],
                className,
              )}
              initial={motionMap[position].initial}
              animate={motionMap[position].animate}
              exit={motionMap[position].exit}
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
