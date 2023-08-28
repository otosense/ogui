interface ILineSeries {
	channel: string;
	name: string;
	getData: () => Promise<any>;
}

interface ILineChartProps {
	chartTitle: string;
	dataType: string;
	chartType: string;
	xLabel: string;
	yLabel: string;
	miniMap: boolean;
	srcChannels: ILineSeries[];
}

interface IXrangeSeries {
	channel: string;
	name: string;
	getData: () => Promise<any>;
}

interface IXrangeChartProps {
	chartTitle: string;
	dataType: string;
	chartType: string;
	xLabel: string;
	yLabel: string;
	miniMap: true;
	srcChannels: IXrangeSeries;
}

interface IDataVisualizerProps {
	gridSpec: string;
	chartsConfig: any[];
}

interface yAxisConfig {
	offset: number;
	opposite: boolean;
	min: number;
	max: number;
	tickInterval: number;
	labels: {
		align: string;
		x: number;
	};
	title: {
		text: string;
	};
	plotBands?: [];
	lineWidth: number;
	maxPadding: number;
	endOnTick: boolean;
	gridLineWidth: number;
	scrollbar: {
		enabled: boolean;
	};
}

interface singleXaxisSrcChannels {
	channel: string;
	type: string;
	name: string;
	getData: (() => {}) | (() => Promise<any>);
	yAxis: number;
	legend_name: string;
}
interface ISingleXaxisProps {
	chartTitle: string;
	dataType: string;
	chartType: string;
	xLabel: string;
	yLabel: string;
	miniMap: boolean;
	dataLimit: number;
	yAxisConf: yAxisConfig[];
	srcChannels: singleXaxisSrcChannels[];
}

export type {
	IDataVisualizerProps,
	ILineChartProps,
	IXrangeChartProps,
	ISingleXaxisProps,
};
