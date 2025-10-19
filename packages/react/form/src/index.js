// src/index.js

import React from 'react';
// Import the createRoot function from the client package
import { createRoot } from 'react-dom/client';

// Import your main application component
import App from './App';

// Optional: Import global styles (if you have them)
import './App.css';



// 1. Locate the container element defined in public/index.html.
const container = document.getElementById('root');

// 2. Create a root for the application using the new React 18 API.
// This is more efficient than the old ReactDOM.render() method.
const root = createRoot(container);

// 3. Render the application components into the root.
root.render(
    // The <React.StrictMode> wrapper is optional but recommended.
    // It helps find common mistakes during development by running extra checks.
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you were using the older React 17 API, it would look like this:
/*
import ReactDOM from 'react-dom';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/