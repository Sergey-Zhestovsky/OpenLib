import React from 'react';

import Button, { buttonStyles } from '../../../Button/Button';
import Profile from './Profile/Profile';

import styles from './user.module.scss';

export default function User(props) {
  return (
    <div className={styles["container"]}>
      {
        false
          ? (
            <div className={styles["button-list"]}>
              <Button
                style={buttonStyles.default}
                className={styles["button"]}
              >
                Sing in
              </Button>
              <Button
                style={buttonStyles.default}
                className={styles["button"]}
              >
                Sing up
              </Button>
            </div>
          ) : (
            <Profile />
          )
      }
    </div>
  );
}