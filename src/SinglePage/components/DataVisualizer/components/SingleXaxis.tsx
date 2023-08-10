import { memo, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsStock from "highcharts/modules/stock"; // import the Highcharts Stock module

HighchartsStock(Highcharts); // initialize the module

const SingleXaxisChart = (props: any) => {
  // Props Received from the Charts.tsx component from Backend API
  console.log("props", props);
  console.log("charts", props.chartsConfig);
  const {
    chart_title,
    chart_type,
    x_label,
    y_label,
    src_channels,
    yAxis_conf,
  } = props.chartsConfig;

  const chartRef = useRef<HighchartsReact.Props>(null);
  const [xCategory, setXCategory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seriesOptions, setSeriesOptions] = useState([]);

  let chartsNumber = yAxis_conf.length;
  let heightPercent = 100 / chartsNumber - 5 + "%";
  let topInterval = 100 / chartsNumber;

  let topIntervalsArray: any[] = [];
  for (let i = 0; i < chartsNumber; i++) {
    topIntervalsArray.push(i * topInterval + "%");
  }

  useEffect(() => {
    yAxis_conf.map((y_conf: any, index: number) => {
      y_conf["top"] = topIntervalsArray[index];
      y_conf["height"] = heightPercent;
    });

    let allSeriesOptions: any = [];

    src_channels.map((chartSeriesData: any, index: number) => {
      let { get_data } = chartSeriesData;

      const chartData = get_data();

      const xAxisCategories = chartData.xAxisCategories;
      const seriesData = chartData.seriesData;

      if (index == 0) {
        setXCategory(xAxisCategories);
      }

      let oneSeriesOptions = {
        type: chartSeriesData.type,
        name: chartSeriesData.name,
        data: seriesData,
        lineColor: "#777d7d",
        tooltip: {
          pointFormatter: function () {
            var point = this;
            return (
              '<span style="color:' +
              point.color +
              '">\u25CF</span> ' +
              point.series.name +
              ": <b>" +
              point.y +
              " kg</b><br/>"
            );
          },
        },
        marker: {
          fillColor: "white",
          lineWidth: 2,
          lineColor: "#777d7d",
        },
        yAxis: chartSeriesData.yAxis,
        showInLegend: false,
      };
      allSeriesOptions.push(oneSeriesOptions);
    });
    // console.log("allSeriesOptions", allSeriesOptions);
    setSeriesOptions(allSeriesOptions);
    // console.log("yAxis_conf", yAxis_conf);
  }, []);

  const options = {
    chart: {
      type: String(chart_type),
      //height: null,
      //width: 1000,
      marginRight: 10,
      zoomType: "xy",
      panning: true,
      panKey: "shift",
      scrollablePlotArea: {
        minHeight: 3000,
        // minWidth: 1000,
      },
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
    yAxis: yAxis_conf,
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
    series: seriesOptions,
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
    <div className="single-xaxis-bg-container">
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

export default memo(SingleXaxisChart);
