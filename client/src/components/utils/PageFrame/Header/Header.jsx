import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import MenuList from './MenuList/MenuList';
import UserMenu from './UserMenu/UserMenu';

import styles from './header.module.scss';

export const headerStyles = {
};

export default function Header(props) {
  const { headerStyle } = props;

  return (
    <header className={classNames(styles["header"])}>
      <div className={styles["logo"]}>
        <Link to="/">
          <img
            className={styles["logo-image"]}
            src="/icon/logo192_white.png"
          />
        </Link>
      </div>
      <div className={styles["menu-container"]}>
        <nav className={styles["menu"]}>
          <MenuList />
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}