import classNames from 'classnames';
import { Children, cloneElement } from 'react';

import { useDropdownMenuActions } from '../DropdownMenuProvider';
import styles from './DropdownMenuItem.module.scss';

type Props = {
  children: JSX.Element;
  className?: string;
};

export function DropdownMenuItem({ children, className }: Props) {
  const child = Children.only(children);
  const { hide } = useDropdownMenuActions();

  return (
    <li className={classNames(styles.DropdownMenuItem, className)}>
      {cloneElement(children, {
        onClick: () =>
          Promise.resolve(child.props.onClick?.()).then(() => hide()),
      })}
    </li>
  );
}
