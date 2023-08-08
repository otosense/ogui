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
import { ZoomContext } from "./Charts";

HighchartsStock(Highcharts); // initialize the module

const LineChart = (props: any) => {
  // Props Received from the Charts.tsx component from Backend API
  const {
    chart_title,
    chart_type,
    x_label,
    y_label,
    miniMap,
    data_limit,
    src_channels,
  } = props?.configs;
  const { get_data } = src_channels;

  // Create Chart Reference
  const chartRef = useRef<HighchartsReact.Props>(null);
  //const [data, setData] = useState<IChannelMappingResponse[]>(src_channels); // handling Data for visualization
  const [xCategory, setXCategory] = useState<string[]>([]); // handling X-Axis for plotting
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Any changes happening data will be called and updated the charts
    const chart = chartRef.current?.chart;
    if (chart) {
      // console.log('data', data);
      const data = get_data();

      const xAxisCategories = data[0];
      const seriesData = data[1];

      setIsLoading(false);
      chart.update({ xAxis: { categories: xAxisCategories } });
      chart.update({ series: [{ data: seriesData }] });

      // Re-Draw the chart default behavior of the Highcharts
      chart.redraw();
    }
  }, [props]);

  const options = {
    chart: {
      // type: "line",
      type: String(chart_type),
      // animation: Highcharts.svg, // don't animate in old IE
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
      labels: {
        rotation: -25,
        formatter(this: Highcharts.AxisLabelsFormatterContextObject): string {
          // Convert the timestamp to a date string
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
        // return `<b>${this.x}</b><br/><b>${this.y}</b>`;
        console.log("this", this);

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
    series: data.map((channel: IChannelMappingResponse) => ({
      name: channel.channel,
      // turboThreshold: 100000,
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
          // return this.point?.title;
          return String(this.value);
        },
      },
      stickyTracking: true,
      dataGrouping: {
        enabled: false,
      },
    })),
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
            options={options}
            constructorType={"stockChart"} // use stockChart constructor
          />
          {/* <button onClick={handlePan} className='loadMoreButton'>Load More</button> */}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
// type: IChannelMappingResponse
export default memo(LineChart);
