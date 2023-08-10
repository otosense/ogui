import { memo, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import xrange from "highcharts/modules/xrange";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsStock from "highcharts/modules/stock"; // import the Highcharts Stock module

HighchartsStock(Highcharts); // initialize the module
xrange(Highcharts);
HighchartsBoost(Highcharts);

const XrangeChart = (props: any) => {
  // Props Received from the Charts.tsx component from Backend API
  const { chart_title, chart_type, x_label, y_label, miniMap, src_channels } =
    props.configs;

  const chartRef = useRef<HighchartsReact.Props>(null);
  const [yAxisCategory, setYAxisCategory] = useState<string[]>([]); // handling X-Axis for Data
  const [seriesData, setSeriesData] = useState<any[]>([]); // handling X-Axis for plotting in Chart

  useEffect(() => {
    const { get_data } = src_channels;

    const backendData = get_data();
    const backendYCategories = backendData.yAxisCategories;
    const backendSeriesData = backendData.seriesData;

    setSeriesData(backendSeriesData);
    setYAxisCategory(backendYCategories);
  }, [props]);

  const Options = {
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
      type: "datetime",
      dateFormat: "%Y-%m-%d %H:%M:%S",
      visible: true,
      tickPixelInterval: 100,
      labels: {
        formatter(this: Highcharts.AxisLabelsFormatterContextObject): string {
          // return Date(this.value);
          return Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.value);
        },
      },
      title: {
        text: String(x_label),
      },
    },
    yAxis: {
      opposite: false,
      lineWidth: 1,
      title: {
        text: String(y_label),
      },
      categories: yAxisCategory,
      //   labels: {
      //     formatter(this: Highcharts.AxisLabelsFormatterContextObject): string {
      //       // Truncate the label text
      //       var maxLength = 4; // Maximum number of characters
      //       var label: string | number = this.value;
      //       if (label?.length > maxLength) {
      //         label = label?.substring(0, maxLength) + "...";
      //       }
      //       return String(label);
      //     },
      //   },
    },
    // tooltip: {
    //   shared: true,
    //   formatter(this: Highcharts.TooltipFormatterContextObject): string {
    //     if (this && this.points) {
    //       // let tooltip = '<b>' + 'ts : ' + epochConverted(this.x) + '</b><br/>';
    //       let tooltip = "";
    //       this.points.forEach(function (point: Highcharts.Point): void {
    //         const x = epochConverted(point.x);
    //         const x2 = point.x2 != null ? epochConverted(point.x2) : "";
    //         const yCategory =
    //           point?.yCategory !== null ? point.yCategory?.toString() : "";
    //         tooltip += `<b>From: ${x} - To: ${x2}</b><br/><b>${yCategory}> `;
    //       });
    //       return tooltip;
    //     } else {
    //       return "";
    //     }
    //   },
    // },
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
    series: [
      {
        name: src_channels.name,
        data: seriesData,
        turboThreshold: 100000,
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
          formatter(this: any): string {
            return this.point?.title;
          },
        },
      },
    ],

    // navigator: {
    //   enabled: Boolean(minimap === undefined ? true : minimap),
    //   // enabled: false,
    //   adaptToUpdatedData: true,
    //   xAxis: {
    //     labels: {
    //       formatter(this: Highcharts.AxisLabelsFormatterContextObject): string {
    //         const xValue = this.value;
    //         return String(xValue);
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
      <HighchartsReact
        highcharts={Highcharts}
        ref={chartRef}
        options={Options}
        constructorType={"stockChart"} // use stockChart constructor
      />
    </div>
  );
};
export default memo(XrangeChart);
