import React, { Component } from 'react';
import classNames from 'classnames';

class Input extends Component {
  inputRef = React.createRef();

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const filteredValue = this.filter(value);
    const validationResult = this.validation(filteredValue);
    const validationHandleResult = this.validationHandler(validationResult);

    if (validationHandleResult && this.props.onChange)
      return this.props.onChange(name, value);
  }

  pasteHandler = (event) => {
    if (!this.props.onPaste)
      return;

    let name = event.target.name,
      value = event.clipboardData.getData("Text");

    value = this.filter(value);

    return this.props.onPaste(name, value);
  }

  focus = () => {
    return this.inputRef.current.focus();
  }

  filter(value) {
    let filter = this.props.filter;

    if (!filter)
      return value;

    if (filter instanceof Array)
      for (let one of filter)
        value = one(value);

    if (filter instanceof Function)
      value = filter(value);

    return value;
  }

  validation(value) {
    let validator = this.props.validate,
      result = null;

    if (!validator)
      return true;

    if (validator instanceof Array) {
      for (let i = 0; i < validator.length; i++) {
        result = validatorManager(validator[i]);

        if (!validatorAnswerHandler(result))
          return result;
      }
    } else {
      result = validatorManager(validator);

      if (!validatorAnswerHandler(result))
        return result;
    }

    return result;

    function validatorManager(validator) {
      if (validator instanceof RegExp)
        return validator.test(value);

      if (validator instanceof Function)
        return validator(value);

      if (validator instanceof String)
        return validator === value;

      return true;
    }

    function validatorAnswerHandler(answer) {
      if (answer instanceof Boolean)
        return answer;

      return false;
    }
  }

  validationHandler(validationResult) {
    return validationResult ? validationResult : false;
  }

  render() {
    const props = this.props;
    const currentProps = {
      name: props.name,
      className: props.className,
      placeholder: props.placeholder,
      disabled: props.disabled,
      onFocus: props.onFocus,
      onBlur: props.onBlur,

      value: props.value ?? "",
      type: props.type ?? "text",
      ref: this.inputRef,
      onChange: this.changeHandler,
      onPaste: this.pasteHandler,
    };

    if (props.textarea)
      return <textarea {...currentProps}></textarea>;

    return <input {...currentProps} />;
  }
}

export default Input;