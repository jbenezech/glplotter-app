import React from 'react';
import ReactDOM from 'react-dom/client';
import {App, PlatformProvider} from '@glplotter-app/common';
import {ElectronContext} from './platform/ElectronContext';
import '@glplotter-app/common/dist/main.css';

const anchor = document.getElementById('root');
if (anchor === null) {
  throw new Error('Root not found in document');
}
const root = ReactDOM.createRoot(anchor);
root.render(
  <React.StrictMode>
    <PlatformProvider implementation={ElectronContext}>
      <App />
    </PlatformProvider>
  </React.StrictMode>
);
