import React from 'react';
import { useState } from 'react';
import './App.css';
import HeatmapChart from './components/charts/HeatMap';
import HistogramChart from './components/charts/Histogram';
import RealTimeChart from './components/charts/RealTimeChart';
import BarChart from './components/charts/BarChart';
import Annotation from './components/charts/Annotation';
import XRangeChart from './components/charts/Xseries';

function App() {
  const gridCountForEachRow = 3;

  return (
    <div className='grid' style={{ gridTemplateColumns: `repeat(${gridCountForEachRow}, 1fr)` }}>
      <Annotation />
      <HeatmapChart />
      <HistogramChart />
      <RealTimeChart />
      <BarChart />
      <XRangeChart />
    </div>
  );
}

export default App;
