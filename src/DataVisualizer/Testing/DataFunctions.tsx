import wfJsonObject from "../Testing/Data/jsonformatter.json";
import wfJsonObject2 from "../Testing/Data/jsonformatter2.json";
import Data from "../Testing/Data/Annot.json";

async function getAnnotData(): Promise<any> {
	console.log("data", Data.data[0].data);

	let uniqueArray: any[] = [];
	let Yaxis: any = [];

	let seriesData: any = [];

	let dataSamples = Data.data[0].data;
	console.log("data", dataSamples);

	dataSamples.map((singleChannelData) => {
		Yaxis.push(singleChannelData.tag);
		uniqueArray = [...new Set(Yaxis)];

		const chartData = {
			x: singleChannelData.bt,
			x2: singleChannelData.tt,
			y: uniqueArray?.indexOf(singleChannelData.tag),
			title: singleChannelData.tag,
		};
		seriesData.push(chartData);
	});
	let formattedData = { yAxisCategories: uniqueArray, seriesData: seriesData };
	return formattedData;
}

async function getWfData(): Promise<any> {
	console.log("wf", wfJsonObject.data);

	let channelData = wfJsonObject.data[0];
	const { data } = channelData;
	if (channelData) {
		const timeDifferBetweenSamples = Math.floor(
			1 / (channelData?.sr / (1000 * 1000))
		);
		let sampleTime = channelData?.ts;
		const sampleTimeArray: any = [];

		data.forEach((sampleValue: number, index: number) => {
			if (index !== 0) {
				sampleTime += timeDifferBetweenSamples;
			}
			sampleTimeArray.push(sampleTime);
		});
		// let chartData = {
		// 	xAxisCategories: ["Jan", "Feb", "Mar", "Apr", "May"],
		// 	seriesData: [1, 3, 2, 4, 5],
		// };

		let chartData = {
			xAxisCategories: sampleTimeArray,
			seriesData: data,
		};
		// console.log("chart", chartData);
		return chartData;
	}
}

async function getWf2Data(): Promise<any> {
	console.log("wf", wfJsonObject2.data);

	let channelData = wfJsonObject2.data[0];
	const { data } = channelData;
	if (channelData) {
		const timeDifferBetweenSamples = Math.floor(
			1 / (channelData?.sr / (1000 * 1000))
		);
		let sampleTime = channelData?.ts;
		const sampleTimeArray: any = [];

		data.forEach((sampleValue: number, index: number) => {
			if (index !== 0) {
				sampleTime += timeDifferBetweenSamples;
			}
			sampleTimeArray.push(sampleTime);
		});
		// let chartData = {
		// 	xAxisCategories: ["Jan", "Feb", "Mar", "Apr", "May"],
		// 	seriesData: [9, 11, 10, 12, 13],
		// };
		let chartData = {
			xAxisCategories: sampleTimeArray,
			seriesData: data,
		};
		console.log("chart2", chartData);
		return chartData;
	}
}

const getSingleAxisData1 = () => {
	let chartData = {
		xAxisCategories: ["Jan", "Feb", "Mar", "Apr", "May"],
		seriesData: [9, 11, 23, 12, 13],
	};

	return chartData;
};

const getSingleAxisData2 = () => {
	let chartData = {
		xAxisCategories: ["Jan", "Feb", "Mar", "Apr", "May"],
		seriesData: [12, 10, 5, 7, 6],
	};

	return chartData;
};

export {
	getAnnotData,
	getWfData,
	getWf2Data,
	getSingleAxisData1,
	getSingleAxisData2,
};
