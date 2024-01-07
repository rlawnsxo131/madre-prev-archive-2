import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * @description 특정 엘리먼트의 스크롤을 막기위해 사용합니다.
 * ref 의 값이 없다면 body 의 스크롤을 막습니다.
 * isLock 이 true 인경우 body의 overflow가 hidden 이 됩니다.
 * isLock 이 false 인경우 body가 기존에 가지고 있던 overflow 값이 됩니다.
 *
 * @param isLock
 */
export function useLockBodyScroll(isLock = false, ref = document.body) {
  useIsomorphicLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(ref).overflow;

    if (isLock) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLock]);
}
