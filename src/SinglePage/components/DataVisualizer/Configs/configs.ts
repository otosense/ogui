// const getAnnotData = () => {
//   //function which calls api and returns data in expected format
//   ///expected format: return yAxisCategories, seriesdata
//   //yAxisCategories: [] of unique strings on y axis, seriesdata: [{x:, x2:, y:},{x:,x2:,y:},etc,....] list of objects

//   return "";
// };
// const getWfData = () => {
//   //function which calls api and returns the data in expected format
//   //expected format : return xAxisCategories, seriesData
//   //xAxisCategories: [] of x values, seriesData: [1,2,3,4] of y values
//   return "";
// };

import { getAnnotData, getWfData } from "./Datafunctions";

const chartsConfig = [
  {
    chart_title: "Annot Chart",
    data_type: "annot",
    chart_type: "xrange",
    x_label: "Time",
    y_label: "Tag",
    miniMap: true,
    data_limit: 1000,
    src_channels: {
      channel: "annot",
      name: "annotation1",
      get_data: getAnnotData,
    },
  },
  {
    chart_title: "Chart 2",
    data_type: "wf",
    chart_type: "line",
    x_label: "Time",
    y_label: "Value",
    miniMap: true,
    data_limit: 1000,
    src_channels: {
      channel: "wf",
      name: "waveform",
      get_data: getWfData,
    },
  },
];

export { chartsConfig };
