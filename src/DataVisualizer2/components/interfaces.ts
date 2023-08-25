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

export type { IDataVisualizerProps, ILineChartProps, IXrangeChartProps };
