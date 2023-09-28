import { memo, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsStock from "highcharts/modules/stock"; // import the Highcharts Stock module
import React from "react";
import { ISingleXaxisProps } from "./interfaces";
import "../css/DataVisualizer.css";
import { isFunction, isObject } from "lodash";
HighchartsStock(Highcharts); // initialize the module

const SingleXaxisChart = (props: ISingleXaxisProps) => {
	const {
		chartTitle,
		chartType,
		xLabel,
		yLabel,
		srcChannels,
		yAxisConf,
		miniMap,
	} = props;

	const chartRef = useRef<any>(null);
	const [xCategory, setXCategory] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [seriesOptions, setSeriesOptions] = useState([]);

	let chartsNumber = yAxisConf.length;
	let heightPercent = 100 / chartsNumber - 5 + "%";
	let topInterval = 100 / chartsNumber;

	let topIntervalsArray: any[] = [];
	for (let i = 0; i < chartsNumber; i++) {
		topIntervalsArray.push(i * topInterval + "%");
	}

	useEffect(() => {
		yAxisConf.map((y_conf: any, index: number) => {
			y_conf["top"] = topIntervalsArray[index];
			y_conf["height"] = heightPercent;
		});

		// let allSeriesOptions: any = [];

		// srcChannels.map((chartSeriesData: any, index: number) => {
		// 	let { get_data } = chartSeriesData;

		// 	const chartData = get_data();

		// 	const xAxisCategories = chartData.xAxisCategories;
		// 	const seriesData = chartData.seriesData;

		// 	if (index == 0) {
		// 		setXCategory(xAxisCategories);
		// 	}

		// 	let oneSeriesOptions = {
		// 		type: chartSeriesData.type,
		// 		name: chartSeriesData.name,
		// 		data: seriesData,
		// 		lineColor: "#777d7d",
		// 		tooltip: {
		// 			pointFormatter: function (this: any): string {
		// 				var point = this;
		// 				return `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y} kg</b><br/>`;
		// 			},
		// 		},
		// 		marker: {
		// 			fillColor: "white",
		// 			lineWidth: 2,
		// 			lineColor: "#777d7d",
		// 		},
		// 		yAxis: chartSeriesData.yAxis,
		// 		showInLegend: false,
		// 	};
		// 	allSeriesOptions.push(oneSeriesOptions);
		// });
		// // console.log("allSeriesOptions", allSeriesOptions);
		// setSeriesOptions(allSeriesOptions);
		// console.log("yAxis_conf", yAxis_conf);
	}, []);

	useEffect(() => {
		// Use an async function inside the useEffect hook
		async function fetchDataAndSet() {
			let allSeriesOptions: any = [];
			setIsLoading(true);

			srcChannels.map(async (chartSeriesData: any, index: number) => {
				let { getData } = chartSeriesData;
				let chartData: any;
				if (isFunction(getData)) {
					const initial = getData();
					if (initial instanceof Promise && initial instanceof Object) {
						if (isFunction(initial?.then)) {
							chartData = await initial.then(async (dataArray: any) => {
								return dataArray();
							});
						} else {
							chartData = initial;
						}
					} else if (initial instanceof Function) {
						const result = initial();
						chartData = result;
					} else if (!(initial instanceof Promise) && initial instanceof Object) {
						const result = initial;
						chartData = result;
					}
				} else if (isObject(getData)) {
					chartData = getData;
				} else {
					chartData = {};
				}
				console.log('chartData', index, chartData);
				const xAxisCategories = chartData.xAxisCategories;
				const seriesData = chartData.seriesData;

				if (index == 0) {
					setXCategory(xAxisCategories);
				}

				let oneSeriesOptions = {
					type: chartSeriesData.type,
					name: chartSeriesData.name,
					data: seriesData,
					lineColor: "#777d7d",
					tooltip: {
						pointFormatter: function (this: any): string {
							var point = this;
							return `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y} kg</b><br/>`;
						},
					},
					marker: {
						fillColor: "white",
						lineWidth: 2,
						lineColor: "#777d7d",
					},
					yAxis: chartSeriesData.yAxis,
					showInLegend: false,
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
			marginRight: 10,
			zoomType: "xy",
			panning: true,
			panKey: "shift",
			scrollablePlotArea: {
				minHeight: 3000,
				// minWidth: 1000,
			},
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
					// Convert the timestamp to a date string
					return String(this.value);
				},
			},
		},
		yAxis: yAxisConf,
		tooltip: {
			shared: true,
			formatter(this: Highcharts.TooltipFormatterContextObject): string {
				return `<b>${this.x}</b><br/><b>${this.y}</b>`; // Round
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
		<div className="single-xaxis-bg-container">
			{!isLoading ? (
				<>
					<HighchartsReact
						highcharts={Highcharts}
						ref={chartRef}
						options={options}
						constructorType={"stockChart"} // use stockChart constructor
						containerProps={{ style: { height: "100%", width: "100%" } }}
					/>
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
};

export default memo(SingleXaxisChart);
