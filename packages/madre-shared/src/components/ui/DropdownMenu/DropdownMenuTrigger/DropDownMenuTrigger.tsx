import classNames from 'classnames';
import { Children, cloneElement } from 'react';

import { useDropdownMenuActions } from '../DropdownMenuProvider';
import styles from './DropdownMenuTrigger.module.scss';

type Props = {
  children: JSX.Element;
  className?: string;
};

export function DropdownMenuTrigger({ children, className }: Props) {
  const child = Children.only(children);
  const { toggle } = useDropdownMenuActions();

  return (
    <div className={classNames(styles.DropdownMenuTrigger, className)}>
      {cloneElement(children, {
        ['aria-label']: '메뉴 열기',
        onClick: () =>
          Promise.resolve(child.props.onClick?.()).then(() => toggle()),
      })}
    </div>
  );
}
