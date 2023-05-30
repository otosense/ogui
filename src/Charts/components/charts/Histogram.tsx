import React, { memo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsHistogram from "highcharts/modules/histogram-bellcurve";

// Initialize the histogram module
HighchartsHistogram(Highcharts);

const options = {
    chart: {
        type: 'histogram',
        // height: "60%",
        marginTop: 40,
        zoomType: "xy",
        panning: true,
        panKey: 'shift'
    },
    title: {
        text: 'Distribution of Exam Scores'
    },
    xAxis: [
        {
            gridLineWidth: 1,
            title: {
                text: "Data",
            },
            panning: true,
            alignTicks: false,
        },
        // {
        //     title: {
        //         text: "Histogram",
        //     },
        //     alignTicks: false,
        //     opposite: true,
        // },
    ],
    yAxis: [
        {
            startOnTick: false,
            endOnTick: false,
            type: 'logarithmic',
            title: {
                text: "Frequency",
            },
            panning: true
        },

        // {
        //     title: {
        //         text: "Histogram",
        //     },
        //     opposite: true,
        // },
    ],
    tooltip: {
        axis: 'xy',
        shared: true
    },
    series: [
        {
            name: "Histogram 1",
            data: [11, 2, 13, 14, 5, 16, 7, 18, 9, 250000],
            marker: {
                enabled: false,
            },
            // states: {
            //     hover: {
            //         lineWidth: 0,
            //     },
            // },
            // enableMouseTracking: false,
        },
        {
            name: "Histogram 2",
            data: [2, 4, 16, 18, 10, 12, 1, 16, 8, 10000],
            marker: {
                // enabled: false,
            },
            // enableMouseTracking: false,
            // states: {
            //     hover: {
            //         lineWidth: 0,
            //     },
            // },
        },
        // {
        //     name: "Histogram 3",
        //     data: [8, 3, 14, 9, 17, 16, 7, 14, 9, 30000],
        //     marker: {
        //         // enabled: false,
        //     },
        //     // enableMouseTracking: false,
        //     // states: {
        //     //     hover: {
        //     //         lineWidth: 0,
        //     //     },
        //     // },
        // },
    ],
};

const HistogramChart: React.FC = () => (
    <div>

        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
);

export default memo(HistogramChart);