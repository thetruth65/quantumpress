// src/main.tsx (Corrected)

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.tsx'
// This line is the most important part - it loads all your styles!
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)