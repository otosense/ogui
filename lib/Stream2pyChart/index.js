"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var recharts_1 = require("recharts");
var Stream2pyChart = function (props) {
    var arr = props.arr, setArr = props.setArr, speed = props.speed;
    var timeoutRef = (0, react_1.useRef)(null);
    var validate = function () {
        setArr();
    };
    (0, react_1.useEffect)(function () {
        var interval = setInterval(function () {
            console.log('This will run every second!');
            timeoutRef.current = null;
            validate();
        }, speed);
        if (timeoutRef.current !== null) {
            clearInterval(interval);
        }
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(recharts_1.AreaChart, { width: 730, height: 250, data: arr, margin: { top: 5, right: 30, left: 20, bottom: 5 } },
            react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
            react_1.default.createElement(recharts_1.XAxis, null),
            react_1.default.createElement(recharts_1.YAxis, null),
            react_1.default.createElement(recharts_1.Tooltip, null),
            react_1.default.createElement(recharts_1.Legend, null),
            react_1.default.createElement(recharts_1.Area, { type: "monotone", dataKey: "X", stroke: "#8884d8", fill: "#8884d8" }))));
};
exports.default = Stream2pyChart;
//# sourceMappingURL=index.js.map