import React from 'react';
import classNames from 'classnames';

import templates from './templates';

import styles from './grid.module.scss';

export default function Grid(props) {
  const {
    template: Component = () => { },
    values = [],
    className
  } = props;

  return (
    <div className={classNames(styles["grid"], className)}>
      {values.map(value => <Component value={value} />)}
    </div>
  );
}

Grid.templates = templates;
export { templates };