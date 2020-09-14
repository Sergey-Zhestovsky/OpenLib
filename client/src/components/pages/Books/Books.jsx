import React from 'react';

import Filter from './BooksFilter/BooksFilter';
import Grid, { templates } from '../../parts/Grid/Grid';
import PageController from '../../parts/PageController/PageController';

export default function Books(props) {

  return (
    <>
      <Filter />
      <Grid
        template={templates.Book}
        values={[1, 2, 3, 4, 5, 6, 7]}
        className="body-wrapper"
      />
      <PageController
        currentPage={1}
        maxPages={5}
        onChange={(page) => console.log(page)}
      />
    </>
  );
}