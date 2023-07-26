import './App.css';
import 'reactflow/dist/style.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RouterConfig from './utilities/Routes/Routes';
import Layout from './utilities/Routes/Layout';
import React, { Suspense, useEffect } from 'react';
import MiniDrawer from './utilities/Routes/ResponsiveLayout';
import DualAxesChart from './components/DataVisualizer/components/DualAxis';
import TripleAxesChart from './components/DataVisualizer/components/TripleAxis';

function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Programmatically navigate to the desired route on component mount
  //   navigate('/dagger');
  // }, []);
  return (
    <>
      {/* <Layout /> */}
      <MiniDrawer />
      <Suspense fallback={<h1>Loading..</h1>}>
        <Routes>
          {/* Add the default '/' route */}
          {RouterConfig.map((route, i) => (
            <Route path={route.path} element={route.component} key={i} />
          ))}
          {/* Add the wildcard route */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
          <Route path="/dual" element={<>
            <DualAxesChart />
            <TripleAxesChart />
          </>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
