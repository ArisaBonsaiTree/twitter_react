import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// ? Access to all the contents in context.js
import {AppProvider} from './components/context'
import './mysass.scss'

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
);

