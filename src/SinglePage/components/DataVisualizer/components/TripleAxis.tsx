import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TripleAxesChart = () => {
    const options = {
        chart: {
            type: 'column',
            zoomType: "xy",
            panning: true,
            panKey: 'shift',
        },
        title: {
            text: 'Triple Axes Chart'
        },
        xAxis: {
            categories: ['Category 1', 'Category 2', 'Category 3']
        },
        yAxis: [
            {
                title: {
                    text: 'Column Axis 1'
                }
            },
            {
                title: {
                    text: 'Column Axis 2'
                },
                opposite: false
            },
            {
                title: {
                    text: 'Line Axis'
                },
                opposite: false
            },
            {
                title: {
                    text: 'Bar Axis'
                },
                opposite: false
            }
        ],
        series: [
            {
                name: 'Column Series 1',
                type: 'column',
                data: [1, 2, 3],
                yAxis: 0
            },
            {
                name: 'Column Series 2',
                type: 'column',
                data: [4, 5, 6],
                yAxis: 1
            },
            {
                name: 'Line Series',
                type: 'line',
                data: [7, 8, 9],
                yAxis: 2
            },
            {
                name: 'Bar Series',
                type: 'column',
                data: [2, 7, 6],
                yAxis: 3
            },
            {
                name: 'Bar Series',
                type: 'column',
                data: [2, 7, 6],
                yAxis: 3
            }
        ]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default TripleAxesChart;