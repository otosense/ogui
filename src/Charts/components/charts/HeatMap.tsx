import React, { memo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';

// Initialize the heatmap module
heatmap(Highcharts);

const options = {
    chart: {
        type: 'heatmap',
        marginTop: 40,
        // marginBottom: 80,
        plotBorderWidth: 1,
        // height: "60%",
    },
    title: {
        text: 'Sales per employee per weekday'
    },
    xAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        title: {
            text: 'Weekday'
        }
    },
    yAxis: {
        categories: ['Steve', 'Jane', 'Joe', 'Janet', 'David'],
        title: {
            text: 'Employees'
        }
    },
    colorAxis: {
        min: 0,
        // minColor: '#FFFFFF',
        // maxColor: Highcharts.getOptions()?.colors?.[0] || '#FF0000'
        minColor: '#FF0000', // Red
        maxColor: '#00FF00' // Green

    },
    series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        type: 'heatmap',
        data: [
            [0, 0, 10],
            [0, 1, 19],
            [0, 2, 8],
            [0, 3, 24],
            [0, 4, 67],
            [1, 0, 92],
            [1, 1, 58],
            [1, 2, 78],
            [1, 3, 117],
            [1, 4, 48],
            [2, 0, 35],
            [2, 1, 15],
            [2, 2, 123],
            [2, 3, 64],
            [2, 4, 52],
            [3, 0, 72],
            [3, 1, 132],
            [3, 2, 114],
            [3, 3, 19],
            [3, 4, 16],
            [4, 0, 38],
            [4, 1, 5],
            [4, 2, 8],
            [4, 3, 117],
            [4, 4, 115],
        ],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }]
};

const HeatmapChart: React.FC = () => (
    <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>

);

export default memo(HeatmapChart);
