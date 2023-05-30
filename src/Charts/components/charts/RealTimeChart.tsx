import { useState, useRef, useEffect, memo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

// Set up the initial options for the chart
const initialOptions = {
    chart: {
        type: "line",
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        zoomType: "xy",
        panning: true,
        panKey: 'shift'
    },
    title: {
        text: "Real-time Time-series Graph",
    },
    xAxis: {
        type: "datetime",
        tickPixelInterval: 150,
    },
    yAxis: {
        type: 'logarithmic',
        title: {
            text: "Value",
        },
        plotLines: [
            {
                value: 0,
                width: 1,
                color: "#808080",
            },
        ],
    },
    tooltip: {
        formatter(): string {
            return `<b>${Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x)}</b><br/><b>${this.y}</b>`;
        },
    },
    legend: {
        enabled: false,
    },
    exporting: {
        enabled: true,
    },
    series: [
        {
            name: "Random data",
            data: [],
        },
    ],
};

const generateDataPoint = (): number => Math.floor(Math.random() * 100);

const RealTimeChart = () => {
    const [options, setOptions] = useState<any>(initialOptions);
    const chartRef = useRef<Highcharts.Chart | null>(null);

    useEffect(() => {
        // Set up the chart subscription
        const chartInterval = setInterval(() => {
            const now = Date.now();
            const newDataPoint: number = generateDataPoint();
            setOptions((prevOptions: { series: { data: any[]; }[]; }) => ({
                ...prevOptions,
                series: [{
                    data: [...prevOptions.series[0].data, [now, newDataPoint]]
                }]
            }));
            if (chartRef.current) {
                //     // chartRef.current.series[0].addPoint([now, newDataPoint], true, true);
            }
        }, 1000);

        return () => clearInterval(chartInterval);
    }, []);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartRef}
            />
        </div>
    );
};

export default memo(RealTimeChart);
