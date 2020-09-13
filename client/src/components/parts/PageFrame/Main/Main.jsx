import React from 'react';
import classNames from 'classnames';

import styles from './main.module.scss';

export const bodyStyles = {
};

export default function Main(props) {
  const {
    children,
    bodyStyle
  } = props;

  return (
    <main className={classNames(styles["main"], bodyStyle)}>
      {children}
    </main>
  );
}