import React from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

export const buttonStyles = {
  default: styles["default"]
};

export default function Button(props) {
  const {
    style,
    className,
    disabledClass,
    children,
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