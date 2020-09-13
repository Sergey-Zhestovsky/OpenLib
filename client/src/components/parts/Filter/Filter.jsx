import React from 'react';
import classNames from 'classnames';

import ButtonElement, { buttonStyles } from '../../utils/Button/Button';
import SelectElement from '../../utils/Select/Select';

import Search from './Search/Search';

import styles from './filter.module.scss';

export default function Filter(props) {
  const { className, children, onSubmit } = props;
  const customSubmit = (e) => e.preventDefault();

  return (
    <form
      className={classNames(styles["filter"], className)}
      onSubmit={onSubmit ?? customSubmit}
    >
      <div className="body-wrapper">
        {children}
      </div>
    </form>
  );
}

export const Segment = (props) => {
  const { className, children } = props;

  return (
    <div className={classNames(styles["segment"], className)}>
      {children}
    </div>
  );
};

export const Select = (props) => {
  const { className, selectClassName, ...rest } = props;

  return (
    <div className={classNames(styles["select"], className)}>
      <SelectElement className={selectClassName} {...rest} />
    </div>
  );
};

export const Button = (props) => {
  const { children, ...rest } = props;
  return <ButtonElement
    style={buttonStyles.cancel}
    {...rest}
  >
    {children}
  </ButtonElement>
};

export const SuccessButton = (props) => {
  const { children, ...rest } = props;
  return <ButtonElement
    {...rest}
    style={buttonStyles.submit}
    type="submit"
  >
    {children}
  </ButtonElement>
};

Filter.Segment = Segment;
Filter.Select = Select;
Filter.Search = Search;
Filter.Button = Button;
Filter.SuccessButton = SuccessButton;

export { Search };