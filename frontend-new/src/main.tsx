import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import "./styles/reset.scss";
import "./styles/globals.scss";
import { ViewportProvider } from './contexts/ViewportContext';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './config/queryClient';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ViewportProvider>
        <RouterProvider router={router} />
      </ViewportProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
