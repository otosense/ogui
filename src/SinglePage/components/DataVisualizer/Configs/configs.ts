import {
  getAnnotData,
  getWfData,
  getWf2Data,
  getSingleAxisData1,
  getSingleAxisData2,
} from "./Datafunctions";

const chartsConfig = [
  {
    chart_title: "Annot Chart",
    data_type: "annot",
    chart_type: "xrange",
    x_label: "Time",
    y_label: "Tag",
    miniMap: true,
    src_channels: {
      channel: "annot",
      name: "annotation1",
      get_data: getAnnotData,
    },
  },
  {
    chart_title: "WF chart",
    data_type: "wf",
    chart_type: "line",
    x_label: "Time",
    y_label: "Value",
    miniMap: true,
    src_channels: [
      {
        channel: "wf",
        name: "waveform1",
        get_data: getWfData,
      },
      {
        channel: "wf",
        name: "waveform2",
        get_data: getWf2Data,
      },
    ],
  },
];

const singleXaxisChartConfig = {
  chart_title: "SingleXaxis",
  data_type: "test",
  chart_type: "singlexaxis",
  x_label: "Time",
  y_label: "Value",
  miniMap: true,
  data_limit: 1000,
  yAxis_conf: [
    {
      offset: 0,
      opposite: false,
      min: -2,
      max: 2,
      tickInterval: 1,
      labels: {
        align: "right",
        x: -3,
      },
      title: {
        text: "y Axis 0",
      },
      plotBands: [],
      lineWidth: 2,
      maxPadding: 0,
      endOnTick: false,
      gridLineWidth: 0,
      scrollbar: {
        enabled: true,
      },
    },
    {
      offset: 0,
      opposite: false,
      min: -50,
      max: 2000,
      tickInterval: 100,
      labels: {
        align: "right",
        x: -3,
      },
      title: {
        text: "y Axis 1",
      },

      lineWidth: 2,
      maxPadding: 0,
      endOnTick: false,
      gridLineWidth: 0,
      scrollbar: {
        enabled: true,
      },
    },
    {
      offset: 0,
      opposite: false,
      min: -50,
      max: 2000,
      tickInterval: 100,
      labels: {
        align: "right",
        x: -3,
      },
      title: {
        text: "y Axis 2",
      },

      lineWidth: 2,
      maxPadding: 0,
      endOnTick: false,
      gridLineWidth: 0,
      scrollbar: {
        enabled: true,
      },
    },
    // {
    //   offset: 0,
    //   opposite: false,
    //   min: 0,
    //   max: 50,
    //   tickInterval: 0.1,
    //   labels: {
    //     align: "right",
    //     x: -3,
    //   },
    //   title: {
    //     text: "y Axis 3",
    //   },

    //   lineWidth: 2,
    //   //maxPadding: 0,
    //   endOnTick: false,
    //   gridLineWidth: 0,
    // },
    // {
    //   offset: 0,
    //   opposite: false,
    //   min: 0,
    //   max: 50,
    //   tickInterval: 0.1,
    //   labels: {
    //     align: "right",
    //     x: -3,
    //   },
    //   title: {
    //     text: "y Axis 4",
    //   },

    //   lineWidth: 2,
    //   //maxPadding: 0,
    //   endOnTick: false,
    //   gridLineWidth: 0,
    // },
  ],
  src_channels: [
    {
      channel: "wf",
      type: "line",
      name: "waveform1",
      get_data: getWfData,
      yAxis: 0,
      legend_name: "data1",
    },
    {
      channel: "wf",
      type: "line",
      name: "waveform2",
      get_data: getWf2Data,
      yAxis: 1,
      legend_name: "data2",
    },
    {
      channel: "wf",
      type: "line",
      name: "waveform3",
      get_data: getWf2Data,
      yAxis: 2,
      legend_name: "data3",
    },
    // {
    //   channel: "wf",
    //   type: "line",
    //   name: "waveform1",
    //   get_data: getSingleAxisData1,
    //   yAxis: 2,
    // },
    // {
    //   channel: "wf",
    //   type: "line",
    //   name: "waveform1",
    //   get_data: getSingleAxisData1,
    //   yAxis: 3,
    // },
    // {
    //   channel: "wf",
    //   type: "line",
    //   name: "waveform1",
    //   get_data: getSingleAxisData1,
    //   yAxis: 4,
    // },
  ],
};

export { chartsConfig, singleXaxisChartConfig };
