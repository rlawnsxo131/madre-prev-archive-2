import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

import { useLockBodyScroll } from '../../../../hooks/useLockBodyScroll';
import { If } from '../../../utility/If';
import { Portal } from '../../../utility/Portal';
import { Overlay } from '../../Overlay';
import { useDrawerOptions, useDrawerState } from '../DrawerProvider';
import styles from './DrawerContent.module.scss';

const animationMap = {
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
  className?: string;
}>;

export function DrawerContent({ children, className }: Props) {
  const { visible } = useDrawerState();
  const { position, duration, withOverlay, withScrollLock } =
    useDrawerOptions();
  const animation = animationMap[position];

  useLockBodyScroll(visible && withScrollLock);

  return (
    <>
      <If predicate={withOverlay}>
        <Overlay visible={visible} />
      </If>
      <Portal>
        <AnimatePresence>
          {visible && (
            <motion.ul
              className={classNames(
                styles.DrawerContent,
                styles[position],
                className,
              )}
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
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
