import React from "react";
import LineChart from "./components/LineChart";
import XrangeChart from "./components/XrangeChart";
import { IDataVisualizerProps } from "./components/interfaces";
import "./css/DataVisualizer.css";

const DataVisualizer = (props: IDataVisualizerProps) => {
	const { chartsConfig, gridSpec } = props;

	const gridRows = parseInt(gridSpec.split("*")[0]);
	const gridCols = parseInt(gridSpec.split("*")[1]);
	let presentCol = 0;
	let presentRow = 1;

	const setPresentRowCol = () => {
		if (presentCol == gridCols && presentRow < gridRows) {
			presentCol = 1;
			presentRow = presentRow + 1;
		} else {
			presentCol = presentCol + 1;
		}
	};

	const renderChartsInGrid = () => {
		return chartsConfig.map((chartData: any, index: number) => {
			{
				setPresentRowCol();
			}
			if (chartData.chartType == "line") {
				return (
					<div
						style={{
							gridRow: `${presentRow}`,
							gridColumn: `${presentCol}`,
							height: "99%",
							width: "99%",
						}}
					>
						<LineChart {...chartData} />
					</div>
				);
			} else if (chartData.chartType == "xrange") {
				return (
					<div
						style={{
							gridRow: `${presentRow}`,
							gridColumn: `${presentCol}`,
							height: "99%",
							width: "99%",
						}}
					>
						<XrangeChart {...chartData} />
					</div>
				);
			}
		});
	};

	return (
		<div
			className="wrapper"
			style={{
				padding: "0px",
				display: "grid",
				gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
				gridTemplateRows: `repeat(${gridRows}, 1fr)`,
				gap: "2px",
			}}
		>
			{renderChartsInGrid()}
		</div>
	);
};

export default DataVisualizer;
