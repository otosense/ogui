import { memo, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsStock from "highcharts/modules/stock"; // import the Highcharts Stock module


import {
  IChannelMappingResponse,
  IProps,
  ISample,
  ISrcChannel,
  IZoomRange,
} from "./API/interfaces";

HighchartsStock(Highcharts); // initialize the module

const LineChart = (props: any) => {
  // Props Received from the Charts.tsx component from Backend API
  const {
    chart_title,
    chart_type,
    x_label,
    y_label,
    src_channels,
  } = props?.configs;
  const { get_data } = src_channels;

  const chartRef = useRef<HighchartsReact.Props>(null);
  const [xCategory, setXCategory] = useState<string[]>([]); 
  const [seriesData, setSeriesData] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Any changes happening data will be called and updated the charts
    const chart = chartRef.current?.chart;
    if (chart) {
      setIsLoading(true);
      const chartData = get_data();
      console.log('data', chartData);

      const xAxisCategories = chartData.xAxisCategories;
      const seriesData = chartData.seriesData;

      setIsLoading(false);
      setXCategory(xAxisCategories);
      setSeriesData(seriesData);
      // chart.update({ xAxis: { categories: xAxisCategories } });
      // chart.update({ series: [{ data: seriesData }] });

      // // Re-Draw the chart default behavior of the Highcharts
      // chart.redraw();
    }
  }, [props]);

  const options = {
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
      tickPixelInterval: 100,
      title: {
        text: String(x_label),
      },
      categories: xCategory,
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
    series:{
      name:"series name",
      data:seriesData,
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
    //       // return this.point?.title;
    //       return String(this.value);
    //     },
    //   },
    //   stickyTracking: true,
    //   dataGrouping: {
    //     enabled: false,
    //   },
    // })),

    
    // navigator: {
    //   enabled: Boolean(minimap === undefined ? true : minimap), // enable the navigator
    //   adaptToUpdatedData: true,
    //   xAxis: {
    //     labels: {
    //       formatter(
    //         this: Highcharts.AxisLabelsFormatterContextObject
    //       ): string | number {
    //         // Format the label based on the x-axis value
    //         const xValue: any = this.value || "";
    //         return xCategory[xValue];
    //       },
    //     },
    //   },
    // },
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

export default memo(LineChart);
