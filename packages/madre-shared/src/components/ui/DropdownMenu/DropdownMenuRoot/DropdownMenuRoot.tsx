import classNames from 'classnames';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import { useRefEffect } from '../../../../hooks/useRefEffect';
import styles from './DropdownMenuRoot.module.scss';

type DropdownMenuRootProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    onClickOutside: () => void;
  }>;

export function DropdownMenuRoot({
  children,
  onClickOutside,
  className,
  ...props
}: DropdownMenuRootProps) {
  /**
   * @link https://stackoverflow.com/questions/72315874/react-click-outside-event-happens-right-after-click-to-open-preventing-the-mod
   * @link https://github.com/facebook/react/issues/24657#issuecomment-1150119055
   */
  const ref = useRefEffect((el: HTMLDivElement) => {
    const handler = (e: MouseEvent) => {
      if (e.target && el.contains(e.target as Node)) {
        return;
      }
      onClickOutside();
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handler, true);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handler, true);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(styles.DropdownMenu, className)}
      {...props}
    >
      {children}
    </div>
  );
}
