import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { OptInProvider } from './libs/optIn'
import { App } from './app'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OptInProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OptInProvider>
  </React.StrictMode>,
)
