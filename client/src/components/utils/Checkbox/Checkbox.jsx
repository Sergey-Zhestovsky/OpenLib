import React from 'react';
import classNames from 'classnames';

import { ReactComponent as CheckboxSVG } from '../../../svg/checkbox.svg';
import { ReactComponent as CheckboxCheckedSVG } from '../../../svg/checkbox-checked.svg';
import { ReactComponent as CheckboxCheckedDarkSVG } from '../../../svg/checkbox-checked-dark.svg';

import styles from './checkbox.module.scss';

export default function Checkbox(props) {
  const {
    checked,
    className,
    ...rest
  } = props;

  return (
    <div className={classNames(styles["wrapper"], className)}>
      <input type="checkbox" checked={checked} {...rest} hidden />
      {
        checked
          ? <CheckboxCheckedSVG className={styles["icon"]} />
          : <CheckboxSVG className={styles["icon"]} />
      }
    </div>
  );
}