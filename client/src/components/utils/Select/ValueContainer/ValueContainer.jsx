import React from 'react';
import { components } from 'react-select';

import styles from './valueContainer.module.scss';

export default function ValueContainer(props) {
  const { children, ...rest } = props;
  const valueLength = rest.getValue().length;

  return (
    <components.ValueContainer {...rest}>
      {
        valueLength > 0 &&
        <div className={styles["counter"]}>
          {valueLength > 99 ? "..." : valueLength}
        </div>
      }
      {children}
    </components.ValueContainer>
  );
}