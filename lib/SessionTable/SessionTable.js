"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.SessionTable = void 0;
var react_1 = __importStar(require("react"));
var components_1 = require("@otosense/components");
var material_1 = require("@mui/material");
var DataTable_1 = require("./DataTable");
var utility_1 = require("./utility");
var tableStyles_1 = require("./tableStyles");
var testData_1 = require("./testData");
var utils_1 = require("../utils");
var cellTags = {
    maxWidth: 480,
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    wordWrap: 'break-word'
};
var columns = [
    {
        label: 'Start Date',
        sx: tableStyles_1.cellDateTime,
        key: function (s) { return (0, utility_1.formatSessionTime)(+s.bt); },
        orderBy: 'bt'
    },
    {
        label: 'Duration (sec)',
        sx: tableStyles_1.cellMW160,
        key: function (s) { return "".concat((s.tt - s.bt) / 1e6); },
    },
    {
        label: 'Annotations',
        sx: cellTags,
        key: function (s) {
            var uniqueAnnots = Array.from(new Set(s.annotations.map(function (a) { return a.name; })));
            return uniqueAnnots.sort().join(', ');
        }
    }
];
var SessionTable = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    var _8 = (0, react_1.useState)((0, utils_1.getDarkModeValue)()), darkMode = _8[0], setDarkMode = _8[1];
    (0, react_1.useEffect)(function () { (0, utils_1.detectDarkModeChange)(setDarkMode); }, []);
    var _9 = (0, react_1.useState)((_b = (_a = props.query) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.from_bt), fromBt = _9[0], setFromBt = _9[1];
    var _10 = (0, react_1.useState)((_d = (_c = props.query) === null || _c === void 0 ? void 0 : _c.filter) === null || _d === void 0 ? void 0 : _d.to_bt), toBt = _10[0], setToBt = _10[1];
    var _11 = (0, react_1.useState)((_f = (_e = props.query) === null || _e === void 0 ? void 0 : _e.filter) === null || _f === void 0 ? void 0 : _f.from_tt), fromTt = _11[0], setFromTt = _11[1];
    var _12 = (0, react_1.useState)((_h = (_g = props.query) === null || _g === void 0 ? void 0 : _g.filter) === null || _h === void 0 ? void 0 : _h.to_tt), toTt = _12[0], setToTt = _12[1];
    var _13 = (0, react_1.useState)((_k = (_j = props.query) === null || _j === void 0 ? void 0 : _j.filter) === null || _k === void 0 ? void 0 : _k.sr), sr = _13[0], setSr = _13[1];
    var _14 = (0, react_1.useState)((_o = (_m = (_l = props.query) === null || _l === void 0 ? void 0 : _l.filter) === null || _m === void 0 ? void 0 : _m.channels) === null || _o === void 0 ? void 0 : _o.names), channels = _14[0], setChannels = _14[1];
    var _15 = (0, react_1.useState)((_r = (_q = (_p = props.query) === null || _p === void 0 ? void 0 : _p.filter) === null || _q === void 0 ? void 0 : _q.channels) === null || _r === void 0 ? void 0 : _r.operator), channelsOp = _15[0], setChannelsOp = _15[1];
    var _16 = (0, react_1.useState)((_u = (_t = (_s = props.query) === null || _s === void 0 ? void 0 : _s.filter) === null || _t === void 0 ? void 0 : _t.annotations) === null || _u === void 0 ? void 0 : _u.names), annotations = _16[0], setAnnotations = _16[1];
    var _17 = (0, react_1.useState)((_x = (_w = (_v = props.query) === null || _v === void 0 ? void 0 : _v.filter) === null || _w === void 0 ? void 0 : _w.annotations) === null || _x === void 0 ? void 0 : _x.operator), annotationsOp = _17[0], setAnnotationsOp = _17[1];
    var defaultRowsPerPage = 50;
    var defaultPage = 0;
    if (((_z = (_y = props.query) === null || _y === void 0 ? void 0 : _y.pagination) === null || _z === void 0 ? void 0 : _z.from_idx) != null) {
        defaultRowsPerPage = props.query.pagination.to_idx - props.query.pagination.from_idx;
        defaultPage = props.query.pagination.from_idx / defaultRowsPerPage;
    }
    var _18 = (0, react_1.useState)(defaultRowsPerPage), rowsPerPage = _18[0], setRowsPerPage = _18[1];
    var _19 = (0, react_1.useState)(defaultPage), page = _19[0], setPage = _19[1];
    var _20 = (0, react_1.useState)((_2 = (_1 = (_0 = props.query) === null || _0 === void 0 ? void 0 : _0.sort) === null || _1 === void 0 ? void 0 : _1.mode) !== null && _2 !== void 0 ? _2 : 'desc'), order = _20[0], setOrder = _20[1];
    var _21 = (0, react_1.useState)((_5 = (_4 = (_3 = props.query) === null || _3 === void 0 ? void 0 : _3.sort) === null || _4 === void 0 ? void 0 : _4.field) !== null && _5 !== void 0 ? _5 : 'bt'), orderBy = _21[0], setOrderBy = _21[1];
    var _22 = (0, react_1.useState)(props.data), filteredData = _22[0], setFilteredData = _22[1];
    var submitFilters = function () {
        var chFilter = (channels != null && channelsOp != null)
            ? {
                names: channels,
                operator: channelsOp
            }
            : null;
        var anFilter = (annotations != null && annotationsOp != null)
            ? {
                names: annotations,
                operator: annotationsOp
            }
            : null;
        var value = {
            filter: {
                from_bt: fromBt,
                to_bt: toBt,
                from_tt: fromTt,
                to_tt: toTt,
                annotations: anFilter,
                device_ids: null,
                channels: chFilter,
                sr: sr
            },
            sort: { field: orderBy, mode: order },
            pagination: {
                from_idx: page * rowsPerPage,
                to_idx: (page + 1) * rowsPerPage
            }
        };
        setFilteredData((0, testData_1.listSessions)(value.filter, value.sort, value.pagination, props.data));
    };
    var filterOptions = [
        {
            label: 'Start Date',
            options: 'date',
            fromValue: fromBt,
            toValue: toBt,
            onChangeFrom: setFromBt,
            onChangeTo: setToBt
        },
        {
            label: 'End Date',
            options: 'date',
            fromValue: fromTt,
            toValue: toTt,
            onChangeFrom: setFromTt,
            onChangeTo: setToTt
        },
        {
            label: 'Sample Rate',
            options: [44100, 48000],
            value: sr,
            onChange: setSr
        },
        {
            label: 'Channels',
            options: 'multilineOperator',
            linesValue: channels,
            onChangeLines: setChannels,
            operatorValue: channelsOp,
            onChangeOperator: setChannelsOp,
            operatorOptions: ['and', 'or']
        },
        {
            label: 'Annotations',
            options: 'multilineOperator',
            linesValue: annotations,
            onChangeLines: setAnnotations,
            operatorValue: annotationsOp,
            onChangeOperator: setAnnotationsOp,
            operatorOptions: ['and', 'or']
        }
    ];
    var clearFilters = function () {
        [setFromBt, setToBt, setFromTt, setToTt, setSr, setChannels, setChannelsOp, setAnnotations, setAnnotationsOp].forEach(function (setter) {
            setter(null);
        });
    };
    var onPageChange = function (event, newPage) {
        setPage(newPage);
    };
    var onRowsPerPageChange = function (event) {
        var newVal = event.target.value;
        setRowsPerPage(parseInt(newVal, 10));
        setPage(0);
    };
    var onOrderChange = function (orderBy) {
        setOrderBy(orderBy);
        setOrder(order === 'asc' ? 'desc' : 'asc');
        setPage(0);
    };
    var renderExpandedSession = function (s) {
        return (react_1.default.createElement(material_1.Grid, { container: true },
            react_1.default.createElement(material_1.Grid, { item: true, sm: 4 },
                react_1.default.createElement(material_1.Stack, { direction: "row" },
                    react_1.default.createElement(material_1.Box, null, 'Channels'),
                    ":",
                    react_1.default.createElement(material_1.Stack, { mt: '5px', ml: 0 }, s.channels.map(function (c, i) {
                        return (react_1.default.createElement(components_1.FlexBox, { key: "channel-".concat(i), ml: 1 },
                            react_1.default.createElement(material_1.Typography, { variant: "h5" }, c.name),
                            !(c.description.length === 0) && react_1.default.createElement(material_1.Typography, { variant: "h6", mr: 0.5 }, "\u00A0- ".concat(c.description))));
                    })))),
            react_1.default.createElement(material_1.Grid, { item: true, sm: 4 },
                react_1.default.createElement(material_1.Stack, { direction: "row" },
                    react_1.default.createElement(material_1.Box, null, "Sample Rate: ".concat(s.sr))))));
    };
    (0, react_1.useEffect)(submitFilters, [page, order, orderBy, rowsPerPage]);
    (0, react_1.useEffect)(function () {
        setPage(0);
    }, [fromBt, toBt, fromTt, toTt, sr, channels, channelsOp, annotations, annotationsOp, rowsPerPage]);
    var style = __assign({ filter: darkMode ? 'invert(1)' : 'invert(0)' }, props.style);
    return (react_1.default.createElement("div", { style: style },
        react_1.default.createElement(DataTable_1.DataTable, { theme: components_1.otosenseTheme2022, data: filteredData, columns: columns, clearFilters: clearFilters, submitFilters: submitFilters, filterOptions: filterOptions, rowsPerPage: rowsPerPage, onRowsPerPageChange: onRowsPerPageChange, page: page, onPageChange: onPageChange, orderBy: orderBy, order: order, onOrderChange: onOrderChange, renderExpandedData: renderExpandedSession, isMultiSelect: props.isMultiSelect, onSelectItems: props.onSelectSessions, totalCount: (_7 = (_6 = props.data) === null || _6 === void 0 ? void 0 : _6.length) !== null && _7 !== void 0 ? _7 : -1 })));
};
exports.SessionTable = SessionTable;
//# sourceMappingURL=SessionTable.js.map