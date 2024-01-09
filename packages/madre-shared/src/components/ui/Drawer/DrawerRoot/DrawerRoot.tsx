import classNames from 'classnames';
import {
  type DetailedHTMLProps,
  forwardRef,
  type HTMLAttributes,
  type PropsWithoutRef,
} from 'react';

import { useCombinedRefs } from '../../../../hooks/useCombinedRefs';
import { useOutsideClickAndEscapeEventRef } from '../../../../hooks/useOutsideClickAndEscapeEventRef';
import { useDrawerActions } from '../DrawerProvider';
import styles from './DrawerRoot.module.scss';

export const DrawerRoot = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >
>(({ children, className, ...props }, forwardedRef) => {
  const { hide } = useDrawerActions();
  const ref = useOutsideClickAndEscapeEventRef<HTMLDivElement>(hide);
  const refs = useCombinedRefs(ref, forwardedRef);

  return (
    <div
      ref={refs}
      className={classNames(styles.DrawerRoot, className)}
      {...props}
    >
      {children}
    </div>
  );
});
