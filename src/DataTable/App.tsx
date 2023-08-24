import React, { memo } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppTest from './AppTest';
const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppTest />
    </QueryClientProvider>
  );
}

export default memo(App);