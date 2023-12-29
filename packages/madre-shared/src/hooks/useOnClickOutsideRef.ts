import { useRefEffect } from './useRefEffect';

/**
 * @description 클릭 이벤트 발생시, ref 에 해당하는 Element 요소의
 * 바깥에서 이벤트가 발생되었다면, parameter 로 넘어온 event 를 실행힙니다.
 *
 * @param event
 *
 * @returns EffectRef<E>
 */
export function useOnClickOutsideRef<E extends HTMLElement = HTMLElement>(
  event: (e: MouseEvent) => void,
) {
  const ref = useRefEffect<E>(
    (el) => {
      const handler = (e: MouseEvent) => {
        if (e.target && el.contains(e.target as Node)) {
          return;
        }
        event(e);
      };

      /**
       * @link https://stackoverflow.com/questions/72315874/react-click-outside-event-happens-right-after-click-to-open-preventing-the-mod
       * @link https://github.com/facebook/react/issues/24657#issuecomment-1150119055
       */
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handler, true);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handler, true);
      };
    },
    [event],
  );

  return ref;
}
