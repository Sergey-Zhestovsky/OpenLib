import React from 'react';

import MenuElement from './MenuElement/MenuElement';

import styles from './menuList.module.scss';

export default function MenuList(props) {
  return (
    <ul className={styles["menu-list"]}>
      <MenuElement to="/books">Books</MenuElement>
      <MenuElement to="/authors">Authors</MenuElement>
    </ul >
  );
}