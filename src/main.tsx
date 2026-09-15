import {BrowserRouter}from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


window.addEventListener('error', (e) => {
  document.body.innerHTML = `<pre style="color:red;padding:20px;white-space:pre-wrap">${e.error?.stack || e.message}</pre>`;
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
