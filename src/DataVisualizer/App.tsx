import React from "react";
import "./App.css";
import Charts from "./components/Charts";
import OChart from "./components/MainChart";
import SingleXaxis from "./components/SingleXaxis";
import {
	chartsConfig,
	singleXaxisChartConfig,
} from "./components/Configs/config";

function App() {
	return <OChart chartsConfig={chartsConfig} gridSpec="2*2" />;
}

export default App;
