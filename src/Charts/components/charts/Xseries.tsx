import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import xrange from "highcharts/modules/xrange";

// Initialize HighchartsMore module
xrange(Highcharts);
const XRangeChart = () => {
    const chartRef = useRef(null);

    const options = {
        chart: {
            type: 'xrange'
        },
        title: {
            text: 'X-range'
        },
        // accessibility: {
        //     point: {
        //         descriptionFormatter: function (point) {
        //             var ix = point.index + 1,
        //                 category = point.yCategory,
        //                 from = new Date(point.x),
        //                 to = new Date(point.x2);
        //             return ix + '. ' + category + ', ' + from.toDateString() +
        //                 ' to ' + to.toDateString() + '.';
        //         }
        //     }
        // },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: ['Prototyping', 'Development', 'Testing'],
            reversed: true
        },
        series: [{
            name: 'Project 1',
            title: 'Project',
            // pointPadding: 0,
            // groupPadding: 0,
            borderColor: 'gray',
            pointWidth: 20,
            data: [{
                x: Date.UTC(2014, 10, 21),
                x2: Date.UTC(2014, 11, 2),
                y: 0,
                title: 'Project',
                color: 'red',
                // title: {
                //     text: 'Check'
                // },
                partialFill: 0.25
            }, {
                x: Date.UTC(2014, 11, 2),
                x2: Date.UTC(2014, 11, 5),
                y: 1,
                title: 'true',
            }, {
                x: Date.UTC(2014, 11, 8),
                x2: Date.UTC(2014, 11, 9),
                y: 2
            }, {
                x: Date.UTC(2014, 11, 9),
                x2: Date.UTC(2014, 11, 19),
                y: 1,
                title: 'false',
            }, {
                x: Date.UTC(2014, 11, 10),
                x2: Date.UTC(2014, 11, 23),
                y: 2
            }, {
                x: Date.UTC(2014, 11, 15),
                x2: Date.UTC(2014, 11, 22),
                y: 2,
                title: 'completed',
            }],
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return this.point.title;
                }
            }
        }]

    };
    console.log('dta', options.series);
    useEffect(() => {
        if (chartRef.current) {

            chartRef.current.chart.reflow();
        }
    }, []);

    return (
        <div>

            <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
        </div>
    );
};

export default XRangeChart;