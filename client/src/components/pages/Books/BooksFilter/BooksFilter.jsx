import React from 'react';

import Filter from '../../../parts/Filter/Filter';

export default function BooksFilter(props) {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanilla2', label: 'Vanilla2' },
    { value: 'vanilla3', label: 'Vanilla3' }
  ];

  return (
    <Filter>
      <Filter.Segment>
        <Filter.Select />
        <Filter.Select />
        <Filter.Select />
        <Filter.Search />
      </Filter.Segment>
      <Filter.Segment>
        <Filter.Button>Cancel</Filter.Button>
        <Filter.SuccessButton>Search</Filter.SuccessButton>
      </Filter.Segment>
    </Filter>
  );
}