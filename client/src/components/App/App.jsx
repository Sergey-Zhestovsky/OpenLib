import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PageFrame from '../parts/PageFrame/PageFrame';
import Books from '../pages/Books/Books';
import Home from '../pages/Home/Home';

import styles from './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <PageFrame>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/books" component={Books} />
        </Switch>
      </PageFrame>
    </BrowserRouter>
  );
}

export default App;