import { memo, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import xrange from "highcharts/modules/xrange";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsStock from "highcharts/modules/stock";
import React from "react";
import { IXrangeChartProps } from "./interfaces";

HighchartsStock(Highcharts);
xrange(Highcharts);
HighchartsBoost(Highcharts);

const XrangeChart = (props: IXrangeChartProps) => {
	const { chartTitle, chartType, xLabel, yLabel, miniMap, srcChannels } = props;

	const chartRef = useRef<HighchartsReact.Props>(null);
	const [yAxisCategory, setYAxisCategory] = useState<string[]>([]); // handling y-Axis for Data
	const [seriesData, setSeriesData] = useState<any[]>([]); // handling X-Axis for plotting in Chart

	const handleLoadMore = () => {
		console.log("loadmore");
	};

	useEffect(() => {
		const { getData } = srcChannels;

		const backendData = getData();
		const backendYCategories = backendData.yAxisCategories;
		const backendSeriesData = backendData.seriesData;

		setSeriesData(backendSeriesData);
		setYAxisCategory(backendYCategories);
	}, [props]);

	const Options = {
		chart: {
			type: String(chartType),
			marginRight: 10,
			zoomType: "xy",
			panning: true,
			panKey: "shift",
		},

		title: {
			text: chartTitle,
		},
		xAxis: {
			type: "datetime",
			dateFormat: "%Y-%m-%d %H:%M:%S",
			visible: true,
			tickPixelInterval: 100,
			labels: {
				formatter(this: Highcharts.AxisLabelsFormatterContextObject): string {
					if (typeof this.value === "number") {
						return Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.value);
					} else {
						return this.value;
					}
				},
			},
			title: {
				text: String(xLabel),
			},
		},
		yAxis: {
			opposite: false,
			lineWidth: 1,
			title: {
				text: String(yLabel),
			},
			categories: yAxisCategory,
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
		series: [
			{
				name: srcChannels.name,
				data: seriesData,
				turboThreshold: 100000,
				pointPadding: 1,
				groupPadding: 1,
				borderColor: "gray",
				pointWidth: 20,
				dataLabels: {
					enabled: false,
					align: "center",
					style: {
						fontSize: "14px",
						fontWeight: "bold",
					},
					formatter(this: any): string {
						return this.point?.title;
					},
				},
			},
		],

		navigator: {
			enabled: Boolean(miniMap === undefined ? true : miniMap),
			// enabled: false,
			adaptToUpdatedData: true,
			xAxis: {
				labels: {
					formatter(this: Highcharts.AxisLabelsFormatterContextObject): string {
						const xValue = this.value;
						return String(xValue);
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
			<>
				<HighchartsReact
					highcharts={Highcharts}
					ref={chartRef}
					options={Options}
					constructorType={"stockChart"} // use stockChart constructor
					containerProps={{ style: { height: "100%", width: "100%" } }}
				/>
				<button onClick={handleLoadMore} className="load-more-button">
					Load More
				</button>
			</>
		</div>
	);
};
export default memo(XrangeChart);
