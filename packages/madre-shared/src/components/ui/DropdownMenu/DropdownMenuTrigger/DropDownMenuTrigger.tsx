import classNames from 'classnames';
import { cloneElement } from 'react';

import { useVisibleContext } from '../../../../contexts/VisibleContext';
import styles from './DropdownMenuTrigger.module.scss';

type DropdownMenuTriggerProps = {
  children: JSX.Element;
  className?: string;
  onClick?: () => void | Promise<void>;
};

export function DropdownMenuTrigger({
  children,
  className,
  onClick,
}: DropdownMenuTriggerProps) {
  const { toggle } = useVisibleContext();

  return (
    <div className={classNames(styles.DropdownMenuTrigger, className)}>
      {cloneElement(children, {
        onClick: () =>
          new Promise((resolve) => {
            if (onClick) {
              resolve(onClick());
            }
            resolve(true);
          })
            .then(() => children.props.onClick?.())
            .then(() => toggle()),
      })}
    </div>
  );
}
