import React from 'react';
import './../css/Dag.css';
import 'reactflow/dist/style.css';
import 'react-splitter-layout/lib/index.css';
import AppTest from './AppTest';

import Dagger from '../Dagger';
import Layouts from '../Components/GridLayout/GridLayout';
function App() {

  return (
    // Main component Starts at Dagger 
    <>
      <Layouts />
      {/* <AppTest /> */}
    </>
  );
}

export default App;

