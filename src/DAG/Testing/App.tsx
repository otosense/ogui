import React from 'react';
import './../css/Dag.css';
import 'reactflow/dist/style.css';
import 'react-splitter-layout/lib/index.css';
import AppTest from './AppTest';

import Dagger from '../Dagger';
import YourComponent from '../Components/GridLayout/GridLayout';
function App() {

  return (
    // Main component Starts at Dagger 
    <>
      <YourComponent />
      {/* <AppTest /> */}
    </>
  );
}

export default App;

