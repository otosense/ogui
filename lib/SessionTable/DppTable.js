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
exports.DppTable = void 0;
var react_1 = __importStar(require("react"));
var components_1 = require("@otosense/components");
var DataTable_1 = require("./DataTable");
var utility_1 = require("./utility");
var tableStyles_1 = require("./tableStyles");
var testData_1 = require("./testData");
var columns = [
    {
        label: 'Name',
        sx: tableStyles_1.cellMW160,
        key: 'name',
        orderBy: 'name'
    },
    {
        label: 'Date Created',
        sx: tableStyles_1.cellDateTime,
        key: function (s) { return (0, utility_1.formatSessionTime)(+s.date_created); },
        orderBy: 'date_created'
    },
    {
        label: 'Sample Rate',
        sx: tableStyles_1.cellMW160,
        key: 'sample_rate',
        orderBy: 'sample_rate'
    },
    {
        label: 'Performance',
        sx: {
            maxWidth: 240,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            wordWrap: 'break-word'
        },
        key: function (s) {
            var p = Math.floor(s.precision * 100);
            var r = Math.floor(s.recall * 100);
            return "Precision: ".concat(p, "% - Recall: ").concat(r, "%");
        }
    }
];
var DppTable = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var defaultRowsPerPage = 50;
    var defaultPage = 0;
    if (((_b = (_a = props.query) === null || _a === void 0 ? void 0 : _a.pagination) === null || _b === void 0 ? void 0 : _b.from_idx) != null) {
        defaultRowsPerPage = props.query.pagination.to_idx - props.query.pagination.from_idx;
        defaultPage = props.query.pagination.from_idx / defaultRowsPerPage;
    }
    var _l = (0, react_1.useState)(defaultRowsPerPage), rowsPerPage = _l[0], setRowsPerPage = _l[1];
    var _m = (0, react_1.useState)(defaultPage), page = _m[0], setPage = _m[1];
    var _o = (0, react_1.useState)((_e = (_d = (_c = props.query) === null || _c === void 0 ? void 0 : _c.sort) === null || _d === void 0 ? void 0 : _d.mode) !== null && _e !== void 0 ? _e : 'desc'), order = _o[0], setOrder = _o[1];
    var _p = (0, react_1.useState)((_h = (_g = (_f = props.query) === null || _f === void 0 ? void 0 : _f.sort) === null || _g === void 0 ? void 0 : _g.field) !== null && _h !== void 0 ? _h : 'bt'), orderBy = _p[0], setOrderBy = _p[1];
    var _q = (0, react_1.useState)(props.data), filteredData = _q[0], setFilteredData = _q[1];
    var submitFilters = function () {
        var value = {
            filter: null,
            sort: { field: orderBy, mode: order },
            pagination: {
                from_idx: page * rowsPerPage,
                to_idx: (page + 1) * rowsPerPage
            }
        };
        setFilteredData((0, testData_1.listData)(value.sort, value.pagination, props.data));
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
    (0, react_1.useEffect)(submitFilters, [page, order, orderBy, rowsPerPage]);
    (0, react_1.useEffect)(function () { setPage(0); }, [rowsPerPage]);
    console.log('DppTable', { filteredData: filteredData });
    return (react_1.default.createElement(DataTable_1.DataTable, { theme: components_1.otosenseTheme2022, style: props.style, data: filteredData, columns: columns, submitFilters: submitFilters, rowsPerPage: rowsPerPage, onRowsPerPageChange: onRowsPerPageChange, page: page, onPageChange: onPageChange, orderBy: orderBy, order: order, onOrderChange: onOrderChange, isMultiSelect: props.isMultiSelect, onSelectItems: props.onSelectDpp, totalCount: (_k = (_j = props.data) === null || _j === void 0 ? void 0 : _j.length) !== null && _k !== void 0 ? _k : -1 }));
};
exports.DppTable = DppTable;
//# sourceMappingURL=DppTable.js.map