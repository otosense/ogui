import React, { memo } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import InfiniteScroll from './pages/InfiniteScroll';
import { Box, Typography } from '@mui/material';
import { APIresponse } from './assets/sample';
import LocalDataTable from './pages/LocalDataTable';
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