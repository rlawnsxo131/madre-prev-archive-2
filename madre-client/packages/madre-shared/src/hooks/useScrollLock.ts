import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * @description 특정 엘리먼트의 스크롤을 막기위해 사용합니다.
 * target 의 값이 없다면 document.body 의 스크롤을 막습니다.
 * isLock 이 true 인경우 body의 overflow가 hidden 이 됩니다.
 * isLock 이 false 인경우 body가 기존에 가지고 있던 overflow 값이 됩니다.
 *
 * @param isLock
 * @param element
 */
export function useScrollLock(
  isLock = false,
  element?: Element | (() => Element | null) | null,
) {
  useIsomorphicLayoutEffect(() => {
    const el = typeof element === 'function' ? element() : element;
    const originalStyle = window.getComputedStyle(el ?? document.body).overflow;

    if (isLock) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLock, element]);
}
