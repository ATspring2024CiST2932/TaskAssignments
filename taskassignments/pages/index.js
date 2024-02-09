// In index.js or index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importing the App component you exported

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
