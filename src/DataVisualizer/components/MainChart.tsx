import "./index.css";
import LineChart from "./LineChart";
import SingleXaxisChart from "./SingleXaxis";
import XrangeChart from "./XrangeChart";
import { OChartIProps } from "./API/interfaces";
import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const OChart = (props: OChartIProps) => {
	const { chartsConfig, gridSpec } = props;

	const gridRows = parseInt(gridSpec.split("*")[0]);
	const gridCols = parseInt(gridSpec.split("*")[1]);
	let presentCol = 0;
	let presentRow = 1;
	const itemWidth = `${100 / gridCols}%`;
	const itemHeight = `${100 / gridRows}%`;

	const setPresentRowCol = () => {
		if (presentCol == gridCols && presentRow < gridRows) {
			presentCol = 1;
			presentRow = presentRow + 1;
		} else {
			presentCol = presentCol + 1;
		}
	};

	const renderChartsInGrid = () => {
		if (chartsConfig.length > gridRows * gridCols) {
			return (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="error">This is an error alert — check it out!</Alert>
				</Stack>
			);
		} else {
			return chartsConfig.map((chartData: any, index: number) => {
				{
					setPresentRowCol();
				}
				if (chartData.chart_type == "line") {
					return (
						<div
							style={{
								gridRow: `${presentRow}`,
								gridColumn: `${presentCol}`,
								height: "99%",
								width: "99%",
							}}
						>
							<LineChart configs={chartData} />
						</div>
					);
				} else if (chartData.chart_type == "xrange") {
					return (
						<div
							style={{
								gridRow: `${presentRow}`,
								gridColumn: `${presentCol}`,
								height: "99%",
								width: "99%",
							}}
						>
							<XrangeChart configs={chartData} />
						</div>
					);
				}
			});
		}
	};

	return (
		<>
			{chartsConfig.length > gridRows * gridCols ? (
				<Stack
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						height: "100%",
					}}
					spacing={2}
				>
					<Alert severity="error">
						Giving more charts config, than Grid can accomdate based on your
						Grid spec!
					</Alert>
				</Stack>
			) : (
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
			)}
		</>
		// <div
		// 	className="wrapper"
		// 	style={{
		// 		padding: "0px",
		// 		display: "grid",
		// 		gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
		// 		gridTemplateRows: `repeat(${gridRows}, 1fr)`,
		// 		gap: "2px",
		// 		// height: "200px",
		// 	}}
		// >
		// 	{renderChartsInGrid()}
		// </div>
	);
};

export default OChart;
