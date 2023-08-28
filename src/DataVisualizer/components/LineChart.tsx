import { memo, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsStock from "highcharts/modules/stock";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ILineChartProps } from "./interfaces";
import "../css/DataVisualizer.css";

HighchartsStock(Highcharts);

const LineChart = (props: ILineChartProps) => {
	const { chartTitle, chartType, xLabel, yLabel, miniMap, srcChannels } = props;

	const chartRef = useRef<HighchartsReact.Props>(null);
	const [xCategory, setXCategory] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [seriesOptions, setSeriesOptions] = useState([]);

	const handleLoadMore = () => {
		console.log("loadmore");
	};

	useEffect(() => {
		let allSeriesOptions: any = [];
		setIsLoading(true);
		srcChannels.map((chartConfig: any, index: number) => {
			const { getData } = chartConfig;
			const chartData = getData();

			const xAxisCategories = chartData.xAxisCategories;
			const seriesData = chartData.seriesData;

			if (index == 0) {
				setXCategory(xAxisCategories);
			}
			let oneSeriesOptions = {
				name: chartConfig.name,
				data: seriesData,
			};
			allSeriesOptions.push(oneSeriesOptions);
		});

		setIsLoading(false);
		setSeriesOptions(allSeriesOptions);
	}, [props]);

	useEffect(() => {
		// Use an async function inside the useEffect hook
		async function fetchDataAndSet() {
			let allSeriesOptions: any = [];
			setIsLoading(true);

			srcChannels.map(async (chartConfig: any, index: number) => {
				const { getData } = chartConfig;
				const chartData = await getData();

				const xAxisCategories = chartData.xAxisCategories;
				const seriesData = chartData.seriesData;

				if (index == 0) {
					setXCategory(xAxisCategories);
				}
				let oneSeriesOptions = {
					name: chartConfig.name,
					data: seriesData,
				};
				allSeriesOptions.push(oneSeriesOptions);
			});

			setIsLoading(false);
			setSeriesOptions(allSeriesOptions);
		}

		fetchDataAndSet();
	}, []);

	const options = {
		chart: {
			type: String(chartType),
			zoomType: "xy",
			panning: true,
			panKey: "shift",
		},
		title: {
			text: String(chartTitle),
		},
		xAxis: {
			tickPixelInterval: 100,
			title: {
				text: String(xLabel),
			},
			categories: xCategory,
			labels: {
				rotation: -25,
				formatter(this: Highcharts.AxisLabelsFormatterContextObject): string {
					return this.value.toString();
				},
			},
		},
		yAxis: {
			lineWidth: 1,
			opposite: false,
			title: {
				text: yLabel,
			},
			allowDecimals: false,
		},
		tooltip: {
			shared: true,
			formatter(this: Highcharts.TooltipFormatterContextObject): string {
				let result = `<b>${this.x}</b><br/>`;

				this.points?.forEach((point) => {
					result += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y}</b><br/>`;
				});

				return result;
			},
		},
		legend: {
			enabled: true,
			verticalAlign: "top",
			align: "center",
		},
		credits: {
			enabled: false,
		},
		exporting: {
			enabled: true,
		},
		plotOptions: {
			series: {
				turboThreshold: Number.MAX_SAFE_INTEGER,
				stickyTracking: true,
			},
		},
		series: seriesOptions,
		navigator: {
			enabled: Boolean(miniMap === undefined ? true : miniMap), // enable the navigator
			adaptToUpdatedData: true,
			xAxis: {
				labels: {
					formatter(
						this: Highcharts.AxisLabelsFormatterContextObject
					): string | number {
						// Format the label based on the x-axis value
						const xValue: any = this.value || "";
						return xCategory[xValue];
					},
				},
			},
		},
		scrollbar: {
			enabled: false, // enable the scrollbar
		},
		rangeSelector: {
			enabled: false, // enable the range selector
		},
		accessibility: {
			enabled: false,
		},
	};
	return (
		<div className="chart-bg-container">
			{!isLoading ? (
				<>
					<HighchartsReact
						highcharts={Highcharts}
						ref={chartRef}
						options={options}
						constructorType={"stockChart"}
						containerProps={{ style: { height: "100%", width: "100%" } }}
					/>
					<button onClick={handleLoadMore} className="load-more-button">
						Load More
					</button>
				</>
			) : (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						height: "100%",
						backgroundColor: "white",
					}}
				>
					<CircularProgress />
				</Box>
			)}
		</div>
	);
};

export default memo(LineChart);
