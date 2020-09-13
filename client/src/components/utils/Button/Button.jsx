import React from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

export const buttonStyles = {
  default: styles["default"],
  cancel: styles["cancel"],
  submit: styles["submit"],
};

export default function Button(props) {
  const {
    style = buttonStyles.default,
    className,
    disabledClass,
    children,
    type = "button",
    ...rest
  } = props;

  return (
    <button
      className={classNames(styles["button"], style, disabledClass, className)}
      {...rest}
    >
      {children}
    </button>
  );
}