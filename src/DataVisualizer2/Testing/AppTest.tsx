import React from "react";
import "./Test.css";
import DataVisualizer from "../DataVisualizer";
import SingleXaxisChart from "../components/SingleXaxis";
import { chartsConfig, singleXaxisChartConfig } from "./config";
import {
	IDataVisualizerProps,
	ISingleXaxisProps,
} from "../components/interfaces";

const dataVisualizerProps: IDataVisualizerProps = {
	chartsConfig: chartsConfig,
	gridSpec: "1*2",
};

function AppTest() {
	// return <DataVisualizer {...dataVisualizerProps} />;
	return <SingleXaxisChart {...singleXaxisChartConfig} />;
}

export default AppTest;
