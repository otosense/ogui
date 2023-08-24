import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorComponent from '../../utilities/ErrorComponent';
import ErrorBoundary from '../../utilities/ErrorBoundary';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Suspense fallback={<h1>Loading..</h1>}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>

  </QueryClientProvider >
  // </React.StrictMode>,
);
