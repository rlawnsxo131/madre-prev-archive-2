import { useRefEffect } from './useRefEffect';

/**
 * @description click 이벤트 발생시, ref 에 해당하는 Element 요소의
 * 바깥에서 이벤트가 발생되었다면, parameter 로 넘어온 event 를 실행합니다.
 *
 * keydown 이벤트 발생시, Escape 를 입력했다면,
 * 이벤트 전파를 막고 paramter 로 넘어온 event 를 실행합니다.
 *
 * @param event
 */
export function useOutsideClickAndEscapeEventRef<
  E extends HTMLElement = HTMLElement,
>(event: (e: MouseEvent | KeyboardEvent) => void) {
  /**
   * @TODO 클릭시 중복이벤트 실행 방지
   */
  const ref = useRefEffect<E>(
    (el) => {
      const clickHandler = (e: MouseEvent) => {
        if (e.target && el.contains(e.target as Node)) {
          return;
        }
        event(e);
      };

      const keydownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          event(e);
        }
      };

      /**
       * @link https://stackoverflow.com/questions/72315874/react-click-outside-event-happens-right-after-click-to-open-preventing-the-mod
       * @link https://github.com/facebook/react/issues/24657#issuecomment-1150119055
       */
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', clickHandler, true);
        document.addEventListener('keydown', keydownHandler);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', clickHandler, true);
        document.removeEventListener('keydown', keydownHandler);
      };
    },
    [event],
  );

  return ref;
}
