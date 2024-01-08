import classNames from 'classnames';

import styles from './DrawerItem.module.scss';

type Props = {
  children: JSX.Element;
  className?: string;
};

export function DrawerItem({ children, className }: Props) {
  return (
    <div className={classNames(styles.DrawerItem, className)}>{children}</div>
  );
}
