import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useLockBodyScroll(isLock = false) {
  useIsomorphicLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isLock) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLock]);
}
