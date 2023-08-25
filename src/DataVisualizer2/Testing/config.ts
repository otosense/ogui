import {
	getAnnotData,
	getWfData,
	getWf2Data,
	getSingleAxisData1,
	getSingleAxisData2,
} from "./DataFunctions";

import {
	ILineChartProps,
	ISingleXaxisProps,
	IXrangeChartProps,
} from "../components/interfaces";

let lineChartConfig: ILineChartProps = {
	chartTitle: "WF chart",
	dataType: "wf",
	chartType: "line",
	xLabel: "Time",
	yLabel: "Value",
	miniMap: true,
	srcChannels: [
		{
			channel: "wf",
			name: "waveform1",
			getData: getWfData,
		},
		{
			channel: "wf",
			name: "waveform2",
			getData: getWf2Data,
		},
	],
};

let xrangeChartConfig: IXrangeChartProps = {
	chartTitle: "Annot Chart",
	dataType: "annot",
	chartType: "xrange",
	xLabel: "Time",
	yLabel: "Tag",
	miniMap: true,
	srcChannels: {
		channel: "annot",
		name: "annotation1",
		getData: getAnnotData,
	},
};

const chartsConfig = [lineChartConfig, xrangeChartConfig];

const singleXaxisChartConfig: ISingleXaxisProps = {
	chartTitle: "SingleXaxis",
	dataType: "test",
	chartType: "singlexaxis",
	xLabel: "Time",
	yLabel: "Value",
	miniMap: true,
	dataLimit: 1000,
	yAxisConf: [
		{
			offset: 0,
			opposite: false,
			min: -2,
			max: 2,
			tickInterval: 1,
			labels: {
				align: "right",
				x: -3,
			},
			title: {
				text: "y Axis 0",
			},
			plotBands: [],
			lineWidth: 2,
			maxPadding: 0,
			endOnTick: false,
			gridLineWidth: 0,
			scrollbar: {
				enabled: true,
			},
		},
		{
			offset: 0,
			opposite: false,
			min: -50,
			max: 2000,
			tickInterval: 100,
			labels: {
				align: "right",
				x: -3,
			},
			title: {
				text: "y Axis 1",
			},

			lineWidth: 2,
			maxPadding: 0,
			endOnTick: false,
			gridLineWidth: 0,
			scrollbar: {
				enabled: true,
			},
		},
		{
			offset: 0,
			opposite: false,
			min: -50,
			max: 2000,
			tickInterval: 100,
			labels: {
				align: "right",
				x: -3,
			},
			title: {
				text: "y Axis 2",
			},

			lineWidth: 2,
			maxPadding: 0,
			endOnTick: false,
			gridLineWidth: 0,
			scrollbar: {
				enabled: true,
			},
		},
	],
	srcChannels: [
		{
			channel: "wf",
			type: "line",
			name: "waveform1",
			getData: getWfData, // or below getData
			// getData: getSingleAxisData1, // when this getData functions using update respective yaxis min and max, ex: -2 to 50 based on chart data range
			//getData:
			yAxis: 0,
			legend_name: "data1",
		},
		{
			channel: "wf",
			type: "line",
			name: "waveform2",
			getData: getWf2Data,
			// getData: getSingleAxisData2,
			yAxis: 1,
			legend_name: "data2",
		},
		{
			channel: "wf",
			type: "line",
			name: "waveform3",
			getData: getWf2Data,
			// getData: getSingleAxisData1,
			yAxis: 2,
			legend_name: "data3",
		},
	],
};

export { chartsConfig, singleXaxisChartConfig };
