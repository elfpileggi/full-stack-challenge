import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { SessionProvider } from './context/session';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
