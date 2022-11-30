import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {App} from '@glplotter-app/common';
import {PlatformProvider} from '@glplotter-app/common';
import {WebContext} from './platform/WebContext';
import '@glplotter-app/common/dist/main.css';

const anchor = document.getElementById('root');
if (anchor === null) {
  throw new Error('Root not found in document');
}
const root = ReactDOM.createRoot(anchor);
root.render(
  <React.StrictMode>
    <PlatformProvider implementation={WebContext}>
      <App />
    </PlatformProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
void reportWebVitals();
