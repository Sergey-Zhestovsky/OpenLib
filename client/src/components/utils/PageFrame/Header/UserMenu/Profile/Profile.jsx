import React from 'react';

import styles from './profile.module.scss';

export default function Profile(props) {
  return (
    <div className={styles["user"]}>
      <div className={styles["user-avatar"]}>
        <img
          className={styles["avatar-image"]}
          src="/avatar/avatar.jpg" />
      </div>
    </div>
  );
}