/* eslint-disable no-console */
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

// Ensure that the styles from index.css are included.
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

const container = document.getElementById('app') as HTMLElement;

const root = createRoot(container);
root.render(
  // Deployed to GitHub pages, so we'll use a HashRouter for simplicity
  <HashRouter>
    <App />
  </HashRouter>
);

window.addEventListener('load', () => {
  registerServiceWorker().then(
    () => {
      console.debug('Service Worker succesfully registered.');
    },
    (error) => {
      console.error('Error during Service Worker registration:', error);
    }
  );
});
