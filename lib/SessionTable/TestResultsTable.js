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
exports.TestResultsTable = void 0;
var react_1 = __importStar(require("react"));
var components_1 = require("@otosense/components");
var material_1 = require("@mui/material");
var DataTable_1 = require("./DataTable");
var utility_1 = require("./utility");
var tableStyles_1 = require("./tableStyles");
var testData_1 = require("./testData");
var columns = [
    {
        label: 'Start Date',
        sx: tableStyles_1.cellDateTime,
        key: function (s) { return (0, utility_1.formatSessionTime)(+s.bt); },
        orderBy: 'bt'
    },
    { label: 'Duration (sec)', sx: tableStyles_1.cellMW160, key: function (s) { return "".concat((s.tt - s.bt) / 1e6); } },
    {
        label: 'Tags',
        sx: {
            maxWidth: 240,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            wordWrap: 'break-word'
        },
        key: function (s) {
            var uniqueTags = new Set(s.annotations.map(function (a) { return a.name; }));
            return Array.from(uniqueTags).join(', ');
        }
    },
    {
        label: 'Class',
        sx: tableStyles_1.cellMW160,
        key: 'class',
        orderBy: 'class'
    },
    {
        label: 'Class Predicted',
        sx: tableStyles_1.cellMW160,
        key: 'class_predicted',
        orderBy: 'class_predicted'
    },
    {
        label: 'Prediction Accuracy',
        sx: tableStyles_1.cellMW160,
        key: function (s) { return (s.class === s.class_predicted) ? 'correct' : 'incorrect'; },
        orderBy: function (a, b) {
            if (a == null || b == null) {
                return 0;
            }
            var x = (a.class === a.class_predicted) ? 0 : 1;
            var y = (b.class === b.class_predicted) ? 0 : 1;
            return x - y;
        }
    }
];
var TestResultsTable = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
    var _10 = (0, react_1.useState)((_b = (_a = props.query) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.from_bt), fromBt = _10[0], setFromBt = _10[1];
    var _11 = (0, react_1.useState)((_d = (_c = props.query) === null || _c === void 0 ? void 0 : _c.filter) === null || _d === void 0 ? void 0 : _d.to_bt), toBt = _11[0], setToBt = _11[1];
    var _12 = (0, react_1.useState)((_f = (_e = props.query) === null || _e === void 0 ? void 0 : _e.filter) === null || _f === void 0 ? void 0 : _f.from_tt), fromTt = _12[0], setFromTt = _12[1];
    var _13 = (0, react_1.useState)((_h = (_g = props.query) === null || _g === void 0 ? void 0 : _g.filter) === null || _h === void 0 ? void 0 : _h.to_tt), toTt = _13[0], setToTt = _13[1];
    var _14 = (0, react_1.useState)((_k = (_j = props.query) === null || _j === void 0 ? void 0 : _j.filter) === null || _k === void 0 ? void 0 : _k.sr), sr = _14[0], setSr = _14[1];
    var _15 = (0, react_1.useState)((_o = (_m = (_l = props.query) === null || _l === void 0 ? void 0 : _l.filter) === null || _m === void 0 ? void 0 : _m.channels) === null || _o === void 0 ? void 0 : _o.names), channels = _15[0], setChannels = _15[1];
    var _16 = (0, react_1.useState)((_s = (_r = (_q = (_p = props.query) === null || _p === void 0 ? void 0 : _p.filter) === null || _q === void 0 ? void 0 : _q.channels) === null || _r === void 0 ? void 0 : _r.operator) !== null && _s !== void 0 ? _s : 'and'), channelsOp = _16[0], setChannelsOp = _16[1];
    var _17 = (0, react_1.useState)((_v = (_u = (_t = props.query) === null || _t === void 0 ? void 0 : _t.filter) === null || _u === void 0 ? void 0 : _u.annotations) === null || _v === void 0 ? void 0 : _v.names), annotations = _17[0], setAnnotations = _17[1];
    var _18 = (0, react_1.useState)((_z = (_y = (_x = (_w = props.query) === null || _w === void 0 ? void 0 : _w.filter) === null || _x === void 0 ? void 0 : _x.annotations) === null || _y === void 0 ? void 0 : _y.operator) !== null && _z !== void 0 ? _z : 'and'), annotationsOp = _18[0], setAnnotationsOp = _18[1];
    var defaultRowsPerPage = 50;
    var defaultPage = 0;
    if (((_1 = (_0 = props.query) === null || _0 === void 0 ? void 0 : _0.pagination) === null || _1 === void 0 ? void 0 : _1.from_idx) != null) {
        defaultRowsPerPage = props.query.pagination.to_idx - props.query.pagination.from_idx;
        defaultPage = props.query.pagination.from_idx / defaultRowsPerPage;
    }
    var _19 = (0, react_1.useState)(defaultRowsPerPage), rowsPerPage = _19[0], setRowsPerPage = _19[1];
    var _20 = (0, react_1.useState)(defaultPage), page = _20[0], setPage = _20[1];
    var _21 = (0, react_1.useState)((_4 = (_3 = (_2 = props.query) === null || _2 === void 0 ? void 0 : _2.sort) === null || _3 === void 0 ? void 0 : _3.mode) !== null && _4 !== void 0 ? _4 : 'desc'), order = _21[0], setOrder = _21[1];
    var _22 = (0, react_1.useState)((_7 = (_6 = (_5 = props.query) === null || _5 === void 0 ? void 0 : _5.sort) === null || _6 === void 0 ? void 0 : _6.field) !== null && _7 !== void 0 ? _7 : 'bt'), orderBy = _22[0], setOrderBy = _22[1];
    var _23 = (0, react_1.useState)(props.data), filteredData = _23[0], setFilteredData = _23[1];
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
        if (channelsOp == null || annotationsOp == null) {
            console.error({ channelsOp: channelsOp, annotationsOp: annotationsOp });
        }
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
    var resetOps = function () { [setChannelsOp, setAnnotationsOp].forEach(function (setter) { setter('and'); }); };
    var clearFilters = function () {
        [setFromBt, setToBt, setFromTt, setToTt, setSr, setChannels, setAnnotations].forEach(function (setter) {
            setter(null);
        });
        resetOps();
    };
    var onPageChange = function (event, newPage) {
        setPage(newPage);
    };
    var onRowsPerPageChange = function (event) {
        var newVal = event.target.value;
        setRowsPerPage(parseInt(newVal, 10));
        setPage(0);
    };
    var onOrderChange = function (newOrderBy) {
        setOrderBy(function () { return newOrderBy; });
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
                            typeof c.description === 'string' && react_1.default.createElement(material_1.Typography, { variant: "h6", mr: 0.5 }, "\u00A0- ".concat(c.description))));
                    })))),
            react_1.default.createElement(material_1.Grid, { item: true, sm: 4 },
                react_1.default.createElement(material_1.Stack, { direction: "row" },
                    react_1.default.createElement(material_1.Box, null, "Sample Rate: ".concat(s.sr))))));
    };
    (0, react_1.useEffect)(submitFilters, [page, order, orderBy, rowsPerPage]);
    (0, react_1.useEffect)(function () {
        setPage(0);
    }, [fromBt, toBt, fromTt, toTt, sr, channels, channelsOp, annotations, annotationsOp, rowsPerPage]);
    return (react_1.default.createElement(DataTable_1.DataTable, { theme: components_1.otosenseTheme2022, style: props.style, data: filteredData, columns: columns, clearFilters: clearFilters, submitFilters: submitFilters, filterOptions: filterOptions, rowsPerPage: rowsPerPage, onRowsPerPageChange: onRowsPerPageChange, page: page, onPageChange: onPageChange, orderBy: orderBy, order: order, onOrderChange: onOrderChange, renderExpandedData: renderExpandedSession, isMultiSelect: props.isMultiSelect, onSelectItems: props.onSelectSessions, totalCount: (_9 = (_8 = props.data) === null || _8 === void 0 ? void 0 : _8.length) !== null && _9 !== void 0 ? _9 : -1 }));
};
exports.TestResultsTable = TestResultsTable;
//# sourceMappingURL=TestResultsTable.js.map