import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './menuElement.module.scss';

export default function MenuElement(props) {
  const { children, ...rest } = props;

  return (
    <li className={styles["list-element"]}>
      <NavLink
        className={styles["link"]}
        activeClassName={styles["active"]}
        {...rest}
      >
        {children}
      </NavLink>
    </li>
  );
}