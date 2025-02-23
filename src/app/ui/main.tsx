import React from 'react'
import ReactDOM from 'react-dom/client'

import AppWithStore from './App.tsx'

// ReactDOM.createRoot(document.getElementById('root')!).render()
document.body.style.height = "100vh";
document.getElementById('root')!.style.height = "100%";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppWithStore />
    </React.StrictMode>,
)
