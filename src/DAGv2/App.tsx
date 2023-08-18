import React from 'react';
import './App.css';
import 'reactflow/dist/style.css';
import Dagger from './Pages/Dagger';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
function App() {

  return (
    // Main component Starts at Dagger 
    <QueryClientProvider client={queryClient}>
      <Dagger />
    </QueryClientProvider>
  );
}

export default App;

