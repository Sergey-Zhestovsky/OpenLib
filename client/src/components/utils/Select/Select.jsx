import React from 'react';
import classNames from 'classnames';
import ReactSelect from 'react-select';

import MultiOption from './MultiOption/MultiOption';
import ValueContainer from './ValueContainer/ValueContainer';
import Input from './Input/Input';

import './select.scss';

export default function Select(props) {
  const {
    multi,
    className,
    ...rest
  } = props;
  const voidFn = () => null;
  const defaultConfig = {
    backspaceRemovesValue: false,
    isClearable: true,
    className: "selector",
    classNamePrefix: "select"
  };
  const createSingleSelectConfig = (className, props) => ({
    ...defaultConfig,
    className: classNames(className, defaultConfig.className),
    ...props
  });
  const createMultiSelectConfig = (className, props) => ({
    ...defaultConfig,
    className: classNames(className, defaultConfig.className),
    isMulti: true,
    hideSelectedOptions: false,
    closeMenuOnSelect: false,
    components: {
      Option: MultiOption,
      ValueContainer,
      Input,
      MultiValue: voidFn,
      Placeholder: voidFn,
    },
    ...props
  });

  if (multi)
    return <ReactSelect {...createMultiSelectConfig(className, rest)} />;

  return <ReactSelect {...createSingleSelectConfig(className, rest)} />;
}