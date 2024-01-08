import classNames from 'classnames';
import { Children, cloneElement } from 'react';

import { useVisibleActions } from '../../../../contexts/VisibleContext';
import styles from './DrawerTrigger.module.scss';

type Props = {
  children: JSX.Element;
  className?: string;
};

export function DrawerTrigger({ children, className }: Props) {
  const child = Children.only(children);
  const { toggle } = useVisibleActions();

  return (
    <div className={classNames(styles.DrawerTrigger, className)}>
      {cloneElement(children, {
        onClick: () =>
          Promise.resolve(child.props.onClick?.()).then(() => toggle()),
      })}
    </div>
  );
}
