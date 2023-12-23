import { useRefEffect } from './useRefEffect';

export function useOnClickOutsideRef<E extends HTMLElement = HTMLElement>(
  event: () => void,
) {
  const ref = useRefEffect<E>(
    (el) => {
      const handler = (e: MouseEvent) => {
        if (e.target && el.contains(e.target as Node)) {
          return;
        }
        event();
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
