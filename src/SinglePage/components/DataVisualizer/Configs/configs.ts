const viewConfig = [
    {
        "chart_title": "chart1",
        "data_type": "wf",
        "chart_type": "line",
        "x_label": "Time",
        "y_label": "Value",
        "miniMap": true,
        "data_limit": 1000,
        "src_channels": [
            {
                "channel": "wf",
                "name": "waveform"
            }
        ]
    },
    {
        "chart_title": "chart2",
        "data_type": "wf",
        "chart_type": "column",
        "x_label": "Time",
        "y_label": "Value",
        "miniMap": true,
        "data_limit": 1000,
        "src_channels": [
            {
                "channel": "wf",
                "name": "waveform"
            }
        ]
    },

    {
        "chart_title": "Chart 4",
        "data_type": "annot",
        "chart_type": "xrange",
        "x_label": "Time",
        "y_label": "Tag",
        "miniMap": true,
        "data_limit": 1000,
        "src_channels": [
            {
                "channel": "annot",
                "name": "annotation1"
            }
        ]
    }
];

export {
    viewConfig
};