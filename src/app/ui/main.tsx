import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// ReactDOM.createRoot(document.getElementById('root')!).render()
document.body.style.height = "100vh";

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
