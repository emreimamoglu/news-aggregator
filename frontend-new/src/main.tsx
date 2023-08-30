import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import "./styles/reset.scss";
import "./styles/globals.scss";
import { ViewportProvider } from './contexts/ViewportContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ViewportProvider>
      <RouterProvider router={router} />
    </ViewportProvider>
  </React.StrictMode>,
)
