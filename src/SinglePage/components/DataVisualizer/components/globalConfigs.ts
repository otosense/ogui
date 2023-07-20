import * as API from './API/API';
import { IProps, ISrcChannel, IZoomRange } from './API/interfaces';

const epochConverted = (time: number) => {
    const epochTime = time;
    const date = new Date(epochTime);
    const localISOTimeString = date.toLocaleString();
    return (localISOTimeString.split(',')[1])?.trim();
};

function defaultZoomBehavior(this: any) {
    const chart = this;
    const resetZoomButton = chart?.renderer.button(
        'Reset Zoom',
        null,
        null,
        function () {
            chart.xAxis[0].setExtremes(null, null);
            chart.yAxis[0].setExtremes(null, null);
        }
    )
        .attr({
            // align: 'right',
            'vertical-align': 'top',
            y: 65,
            x: 0,
            zIndex: 9999
        })
        .addClass('reset-zoom-button')
        .add();

    // Position the button dynamically if the chart width changes
    chart.updateResetZoomButtonPosition = function () {
        resetZoomButton.attr({
            x: chart.chartWidth - resetZoomButton.width - 10
        });
    };

    // Update the button position initially and on chart resize
    chart.updateResetZoomButtonPosition();
    window.addEventListener('resize', chart.updateResetZoomButtonPosition);
}

async function implicitChannelMapping(src_channels: ISrcChannel[], start: number, newStart: number, data: any[], setData: (value: any[]) => void) {
    const promises = src_channels.map(async (eachChannel: { channel: string; }) => {
        /* Note: calling API based on src_channel where key is mentioned as 'channel' */
        const response = await API.getData(eachChannel.channel, start, newStart);
        return {
            channel: eachChannel.channel,
            data: response.data
        };
    });

    try {
        /* 
            Mapping the promises output for respective channels, 
            example: [ { channel: wf, data: [set Of Data]} ,{ channel: wf, data: [set Of Data]}]  
         */
        const responses = await Promise.all(promises);
        responses.map((response) => {
            // checking channel is Existing or not  if yes push the new set of data to 'data' array, if not creating a new channel with 'data' array
            const existingChannelIndex = data.findIndex((item: { channel: string; }) => item.channel === response.channel);
            if (existingChannelIndex !== -1) {
                (data[existingChannelIndex].data.data).push(...response.data.data);
            }
            else {
                data.push(response);
            }
        });
        // setting Data for the Chart
        setData([...data]);
    } catch (error) {
        console.error('Error fetching data For Type 1:', error);
    }
};

async function explicitChannelMapping(src_channels: ISrcChannel[], start: number, newStart: number, data: any[], setData: { (value: any[]): void; }) {
    const promises = src_channels.map(async (eachChannel: { channel: string; }) => {
        /* Note: calling API based on src_channel where key is mentioned as 'channel' */
        const response = await API.getData(eachChannel.channel, start, newStart);
        return {
            channel: eachChannel.channel,
            data: response.data
        };
    });

    try {
        /* 
           Mapping the promises output for respective channels, 
           example: [ { channel: annot, data: [set Of Data]} ,{ channel: annot, data: [set Of Data]}]  
        */
        const responses = await Promise.all(promises);
        responses?.forEach((response) => {
            // checking channel is Existing or not  if yes push the new set of data to 'data' array, if not creating a new channel with 'data' array
            const existingChannelIndex = data.findIndex((item: { channel: string; }) => item.channel === response.channel);

            if (existingChannelIndex !== -1) {
                data[existingChannelIndex].data = [...data[existingChannelIndex]?.data, ...response.data];
            } else {
                data.push(response);
            }
        });
        // setting Data for the Chart
        setData([...data]);
    } catch (error) {
        console.error('Error fetching data For Type 1:', error);
    }
};

function settingZoomInGlobalStore(combineZoom: boolean, e: IZoomRange, props: IProps) {
    if (combineZoom === undefined ? true : combineZoom) { // handling Whether user opted for combineZoom 
        if (e.trigger === 'navigator' || e.trigger === 'zoom') { // Stop unnecessary rendering
            props.onZoomChange(e.min, e.max);
        }
    }
}

function updatingZoomFromGlobalStore(chartRef: any, zoomLevel: IZoomRange | null, combineZoom: boolean) {
    const chart = chartRef.current?.chart;
    if (chart && zoomLevel && combineZoom === undefined ? true : combineZoom) {
        chart.xAxis[0].setExtremes(zoomLevel?.min, zoomLevel?.max);
    }
}



// function formatDateForHighcharts(timeString) {

//     const epochTime = timeString;
//     const date = new Date(epochTime);
//     console.log('dateee', date.getUTCDate(), date);
//     const localISOTimeString = date.toLocaleString();

//     // const outputTime = epochConverted(timeString);
//     // const [time, period] = outputTime.split(' '); // Split time and AM/PM
//     // const [hourStr, minuteStr, secondStr] = time.split(':'); // Split hour, minute, and second

//     // let hour = parseInt(hourStr, 10);
//     // const minute = parseInt(minuteStr, 10);
//     // const second = parseInt(secondStr, 10);

//     // // Adjust hour for AM/PM format
//     // if (period === 'PM' && hour !== 12) {
//     //     hour += 12;
//     // } else if (period === 'AM' && hour === 12) {
//     //     hour = 0;
//     // }

//     // // Create a new Date object in UTC format
//     // const date = new Date(Date.UTC(2022, 0, 1, hour, minute, second));

//     // // Return the UTC timestamp in milliseconds
//     // return date.getTime();
// }

function formatDateForHighcharts(timeString) {
    const epochTimer = new Date(timeString);
    const dateObj = new Date(epochTimer);

    // Extract individual components
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const second = dateObj.getSeconds();

    // Create the formatted string in the Date.UTC format
    const formattedString = `Date.UTC(${year}, ${month}, ${day}, ${hour}, ${minute}, ${second})`;

    return formattedString;
}

function formatDate(timeString) {
    const inputDate = formatDateForHighcharts(timeString);
    console.log('inputDate', inputDate);
    return inputDate;
    const dateValues = inputDate.match(/\d+/g);
    const [year, month, day, hours, minutes, seconds] = dateValues;

    // const formattedDate = `Date.UTC(${year}, ${month - 1}, ${day}, ${hours}, ${minutes}, ${seconds})`;
    const formattedDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds)).toISOString().split('T')[0];

    console.log('formattedDate', formattedDate);
    return formattedDate;
}



export {
    epochConverted,
    defaultZoomBehavior,
    implicitChannelMapping,
    explicitChannelMapping,
    settingZoomInGlobalStore,
    updatingZoomFromGlobalStore,
    formatDateForHighcharts,
    formatDate
};