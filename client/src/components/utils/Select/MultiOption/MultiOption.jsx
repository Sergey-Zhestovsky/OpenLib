import React from 'react';
import { components } from 'react-select';

import Checkbox from '../../Checkbox/Checkbox';

import styles from './multiOption.module.scss';

export default function MultiOption(props) {
  const { isSelected, data } = props;

  return (
    <components.Option {...props}>
      <Checkbox checked={isSelected} className={styles["checkbox"]} />
      <span className={styles["option-value"]}>{data.label}</span>
    </components.Option>
  );
}
