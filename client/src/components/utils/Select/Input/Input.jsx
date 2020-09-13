import React from 'react';
import { components } from 'react-select';

export default function Input(props) {
  const { selectProps: { value, placeholder } } = props;
  const makePlaceholder = (value, placeholder) => {
    if (value && value.length > 0) {
      const samples = value
        .slice(0, 3)
        .map(({ label }) => label)
        .join(", ");
      const overload = value.length > 3;

      return `Selected: ${samples}${overload ? " . . ." : ""}`;
    }

    return placeholder || "Select...";
  };

  return (
    <components.Input
      {...props}
      placeholder={makePlaceholder(value, placeholder)}
    />
  );
}