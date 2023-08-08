import React, { memo, useContext, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsStock from "highcharts/modules/stock"; // import the Highcharts Stock module

import {
  defaultZoomBehavior,
  epochConverted,
  implicitChannelMapping,
  settingZoomInGlobalStore,
  updatingZoomFromGlobalStore,
} from "./globalConfigs";
import {
  IChannelMappingResponse,
  IProps,
  ISample,
  ISrcChannel,
  IZoomRange,
} from "./API/interfaces";
// import { ZoomContext } from "./Charts";

HighchartsStock(Highcharts); // initialize the module

const GenericHighChart = (props: any) => {
  // Props Received from the Charts.tsx component from Backend API
  const {
    chart_title,
    chart_type,
    x_label,
    y_label,
    miniMap,
    data_limit,
    src_channels,
    xCategory,
    seriesData,
  } = props?.configs;
  // Props Received from the Charts.tsx component from userConfig
  // Create Chart Reference
  const chartRef = useRef<HighchartsReact.Props>(null);
  const [data, setData] = useState<IChannelMappingResponse[]>(src_channels); // handling Data for visualization
  const [start, setStart] = useState(0); // handling for API from , to counts
  // const [xCategory, setXCategory] = useState<string[]>([]); // handling X-Axis for plotting
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // Any changes happening data will be called and updated the charts
  //   const chart = chartRef.current?.chart;
  //   if (chart) {
  //     // console.log('data', data);
  //     const updatedSeries = dataMapping(data, setIsLoading);

  //     const flattenSamples = updatedSeries?.flat();
  //     console.log("fla", flattenSamples);
  //     const yAxisData = flattenSamples?.map((series: ISample) => series?.value);

  //     console.log("yAxisData", yAxisData);
  //     const xAxisTs = flattenSamples?.map((series: ISample) => series?.time);
  //     console.log("xAxisTs", xAxisTs);

  //     // setXCategory(xAxisTs);
  //     setIsLoading(false);
  //     chart.update({ xAxis: { categories: xAxisTs } });
  //     chart.update({ series: [{ data: yAxisData }] });

  //     // Handling Zoom and setting the zoom level in Global Store
  //     chart.update({
  //       xAxis: {
  //         events: {
  //           // afterSetExtremes: syncCharts
  //           afterSetExtremes: function (e: IZoomRange) {
  //             settingZoomInGlobalStore(combineZoom, e, props);
  //           },
  //         },
  //       },
  //     });
  //     // Re-Draw the chart default behavior of the Highcharts
  //     chart.redraw();
  //   }
  // }, [props]);

  const lineOptions = {
    chart: {
      type: String(chart_type),
      marginRight: 10,
      zoomType: "xy",
      panning: true,
      panKey: "shift",
    },
    title: {
      text: String(chart_title),
    },
    xAxis: {
      // type: "datetime",
      tickPixelInterval: 100,
      title: {
        text: String(x_label),
      },
      // categories: [],
      categories: xCategory,

      labels: {
        rotation: -25,
        formatter(this: Highcharts.AxisLabelsFormatterContextObject): string {
          return String(this.value);
        },
      },
    },
    yAxis: {
      lineWidth: 1,
      opposite: false,
      type: "linear",
      title: {
        text: String(y_label),
      },
      allowDecimals: false,
    },
    tooltip: {
      shared: true,
      formatter(this: Highcharts.TooltipFormatterContextObject): string {
        return `<b>${this.x}</b><br/><b>${Math.round(this.y)}</b>`; // Round
      },
    },
    legend: {
      enabled: true,
      verticalAlign: "top",
      align: "center",
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
    },
    // series: data.map((channel: IChannelMappingResponse) => ({
    //   name: channel.channel,
    //   turboThreshold: Number.MAX_SAFE_INTEGER,
    //   pointPadding: 1,
    //   groupPadding: 1,
    //   borderColor: "gray",
    //   pointWidth: 20,
    //   dataLabels: {
    //     enabled: false,
    //     align: "center",
    //     style: {
    //       fontSize: "14px",
    //       fontWeight: "bold",
    //     },
    //     formatter(this: Highcharts.AxisLabelsFormatterContextObject): string {
    //       return String(this.value);
    //     },
    //   },
    //   stickyTracking: true,
    //   dataGrouping: {
    //     enabled: false,
    //   },
    // })),
    series: [
      {
        name: "testing",
        data: seriesData,
        turboThreshold: Number.MAX_SAFE_INTEGER,
        pointPadding: 1,
        groupPadding: 1,
        borderColor: "gray",
        pointWidth: 20,
        dataLabels: {
          enabled: false,
          align: "center",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
          formatter(this: Highcharts.AxisLabelsFormatterContextObject): string {
            return String(this.value);
          },
        },
        stickyTracking: true,
        dataGrouping: {
          enabled: false,
        },
      },
    ],
    navigator: {
      enabled: Boolean(minimap === undefined ? true : minimap), // enable the navigator
      adaptToUpdatedData: true,
      xAxis: {
        labels: {
          formatter(
            this: Highcharts.AxisLabelsFormatterContextObject
          ): string | number {
            // Format the label based on the x-axis value
            const xValue: any = this.value || "";
            return xCategory[xValue];
          },
        },
      },
    },
    scrollbar: {
      enabled: false, // enable the scrollbar
    },
    rangeSelector: {
      enabled: false, // enable the range selector
    },
    accessibility: {
      enabled: false,
    },
  };
  return (
    <div className="chartParent">
      {!isLoading ? (
        <>
          <HighchartsReact
            highcharts={Highcharts}
            ref={chartRef}
            options={lineOptions}
            constructorType={"stockChart"} // use stockChart constructor
          />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
// type: IChannelMappingResponse
export default memo(GenericHighChart);

// function dataMapping(
//   srcData: IChannelMappingResponse[],
//   setIsLoading: any
// ): ISample[][] {
//   setIsLoading(true);
//   console.log("called dataMapping");
//   console.log("data before", srcData);

//   return srcData?.map((channel: IChannelMappingResponse) => {
//     const { data } = channel;
//     if (data) {
//       const timeDifferBetweenSamples = data?.sr / (1000 * 1000);
//       let sampleTime = data?.ts;
//       const sampledData: ISample[] = [];

//       data.data[0].forEach((sampleValue: number, index: number) => {
//         if (index !== 0) {
//           sampleTime += timeDifferBetweenSamples;
//         }
//         const sample: ISample = {
//           value: sampleValue,
//           time: epochConverted(sampleTime),
//         };
//         sampledData.push(sample);
//       });

//       console.log("sampledData", sampledData);
//       return sampledData;
//     }
//     return [];
//   });
// }
