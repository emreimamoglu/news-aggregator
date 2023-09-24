import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import "./styles/reset.scss";
import "./styles/globals.scss";
import { ViewportProvider } from './contexts/ViewportContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';
import { UserContextProvider } from './contexts/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ViewportProvider>
          <RouterProvider router={router} />
        </ViewportProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
