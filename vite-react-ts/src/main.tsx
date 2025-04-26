import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// fetch('/api/v1/test')
//   .then(res => res.json())
//   .then(data => console.log(data))

const data = await fetch('/api/v1/test')
  .then(res => res.json())
  .catch(err => console.error('Error fetching test route:', err));
console.log(data)

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
