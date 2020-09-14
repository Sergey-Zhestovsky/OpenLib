import React from 'react';

import GridElement from '../GridElement/GridElement';

export default function Book(props) {
  const { value } = props;

  return (
    <GridElement>
      <GridElement.Image src={"images/blank-book.jpg"} />
      <GridElement.Container>
        <GridElement.Title name={"Test Title"} rating={250} isRated={true} />
        <GridElement.Field name={"Field1"} value={"value1"} />
        <GridElement.Field name={"Field2"} value={"value2"} />
        <GridElement.Field name={"Field3"} value={"value3"} />
        <GridElement.Field name={"Field4"} value={"value4"} />
      </GridElement.Container>
    </GridElement>
  );
}