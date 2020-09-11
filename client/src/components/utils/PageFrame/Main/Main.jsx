import React from 'react';

export const bodyStyles = {
};

export default function Main(props) {
  const {
    children,
    bodyStyle
  } = props;

  return (
    <main>
      {children}
    </main>
  );
}