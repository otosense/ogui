import "./App.css";
import "reactflow/dist/style.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import RouterConfig from "./utilities/Routes/Routes";
import Layout from "./utilities/Routes/Layout";
import React, { Suspense, useEffect } from "react";
import MiniDrawer from "./utilities/Routes/ResponsiveLayout";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Programmatically navigate to the desired route on component mount
    navigate("/dataVisualization");
  }, []);
  return (
    <>
      {/* <Layout /> */}
      <MiniDrawer />
      <Suspense fallback={<h1>Loading..</h1>}>
        <Routes>
          {RouterConfig.map((route, i) => (
            <Route path={route.path} element={route.component} key={i} />
          ))}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
