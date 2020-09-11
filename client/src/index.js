import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

import './css/fonts.scss';
import './css/index.scss';
import 'normalize.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);