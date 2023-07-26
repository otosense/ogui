import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DualAxesChart = () => {
    const options = {
        chart: {
            type: 'column',
            zoomType: "xy",
            panning: true,
            panKey: 'shift',
        },
        title: {
            text: 'Dual Axes Chart'
        },
        xAxis: {
            categories: ['Category 1', 'Category 2', 'Category 3']
        },
        yAxis: [
            {
                title: {
                    text: 'Column Axis'
                }
            },
            {
                title: {
                    text: 'Line Axis'
                },
                opposite: true
            }
        ],
        series: [
            {
                name: 'Column Series',
                type: 'column',
                data: [1, 2, 3]
            },
            {
                name: 'Line Series',
                type: 'line',
                data: [4, 5, 6],
                yAxis: 1
            }
        ]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default DualAxesChart;