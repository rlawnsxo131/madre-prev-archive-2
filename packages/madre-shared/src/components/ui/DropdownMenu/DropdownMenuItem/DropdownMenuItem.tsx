import classNames from 'classnames';
import { Children, cloneElement } from 'react';

import { useVisibleActions } from '../../../../contexts/VisibleContext';
import styles from './DropdownMenuItem.module.scss';

type Props = {
  children: JSX.Element;
  className?: string;
};

export function DropdownMenuItem({ children, className }: Props) {
  const child = Children.only(children);
  const { hide } = useVisibleActions();

  return (
    <li className={classNames(styles.DropdownMenuItem, className)}>
      {cloneElement(children, {
        onClick: () =>
          Promise.resolve(child.props.onClick?.()).then(() => hide()),
      })}
    </li>
  );
}
