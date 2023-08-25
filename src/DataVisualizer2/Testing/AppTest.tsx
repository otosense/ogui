import React from "react";
import "./Test.css";
import DataVisualizer from "../DataVisualizer";
import { chartsConfig, singleXaxisChartConfig } from "./config";
import { IDataVisualizerProps } from "../components/interfaces";

const dataVisualizerProps: IDataVisualizerProps = {
	chartsConfig: chartsConfig,
	gridSpec: "1*2",
};

function AppTest() {
	return <DataVisualizer {...dataVisualizerProps} />;
}

export default AppTest;
