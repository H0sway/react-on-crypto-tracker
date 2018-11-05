import React from 'react';
import ReactDOM from 'react-dom';

import './scss/index.scss';

import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
