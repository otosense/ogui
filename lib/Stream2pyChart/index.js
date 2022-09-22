"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var recharts_1 = require("recharts");
var Stream2pyChart = function (props) {
    var data = props.data, xAxisDataKey = props.xAxisDataKey, yAxis1DataKey = props.yAxis1DataKey, yAxis2DataKey = props.yAxis2DataKey;
    return (react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: "100%" },
        react_1.default.createElement(recharts_1.LineChart, { width: 500, height: 300, data: data, margin: {
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            } },
            react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
            react_1.default.createElement(recharts_1.XAxis, { dataKey: xAxisDataKey }),
            react_1.default.createElement(recharts_1.YAxis, null),
            react_1.default.createElement(recharts_1.Tooltip, null),
            react_1.default.createElement(recharts_1.Legend, null),
            react_1.default.createElement(recharts_1.Line, { type: "monotone", dataKey: yAxis1DataKey, stroke: "#8884d8", activeDot: { r: 8 } }),
            react_1.default.createElement(recharts_1.Line, { type: "monotone", dataKey: yAxis2DataKey, stroke: "#82ca9d" }))));
};
exports.default = Stream2pyChart;
//# sourceMappingURL=index.js.map