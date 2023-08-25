import React from 'react';
import './../css/Dag.css';
import 'reactflow/dist/style.css';
import AppTest from './AppTest';

import Dagger from '../Dagger';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
function App() {

  return (
    // Main component Starts at Dagger 

    <QueryClientProvider client={queryClient}>
      <AppTest />
    </QueryClientProvider>
  );
}

export default App;

