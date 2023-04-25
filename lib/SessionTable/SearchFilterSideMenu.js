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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFilter = exports.SearchHeader = exports.SearchFooter = exports.Filter = void 0;
var react_1 = __importStar(require("react"));
var Tune_1 = __importDefault(require("@mui/icons-material/Tune"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var ExpandMore_1 = __importDefault(require("@mui/icons-material/ExpandMore"));
var styles_1 = require("@mui/material/styles");
var material_1 = require("@mui/material");
var FilterFunctions_1 = require("./FilterFunctions");
var tableStyles_1 = require("./tableStyles");
var utils_1 = require("../utils");
var Filter = function (props) {
    var _a = (0, react_1.useState)(false), drawerState = _a[0], setDrawerState = _a[1];
    var filterTitle = 'Filters';
    var textClear = 'Clear';
    var textSearch = 'Search';
    var toggleState = function () {
        setDrawerState(!drawerState);
    };
    return (react_1.default.createElement(material_1.Box, { sx: { float: 'right', mb: '16px' } },
        react_1.default.createElement(material_1.Button, { color: "secondary", onClick: toggleState, startIcon: react_1.default.createElement(Tune_1.default, null) },
            react_1.default.createElement(material_1.Typography, { variant: "button" }, 'Filters')),
        react_1.default.createElement(exports.SearchFilter, { filterOptions: props.filterOptions, drawerState: drawerState, toggleState: toggleState, title: filterTitle, btnTxtSearch: textSearch, btnTxtClear: textClear, resetFilters: props.clearFilters, formatAndCallSetFilters: props.submitFilters })));
};
exports.Filter = Filter;
exports.SearchFooter = (0, styles_1.styled)(material_1.Box)({
    position: 'absolute',
    bottom: 0,
    textAlign: 'right',
    width: '100%',
    height: '86px',
    padding: '1rem',
    backgroundColor: '#a3a6b4'
});
exports.SearchHeader = (0, styles_1.styled)(material_1.Box)({
    display: 'flex',
    justifyContent: 'space-between',
    background: '#f3f3f3',
    padding: '18px'
});
var SearchFilter = function (props) {
    var filterOptions = props.filterOptions, drawerState = props.drawerState, toggleState = props.toggleState, title = props.title, btnTxtSearch = props.btnTxtSearch, btnTxtClear = props.btnTxtClear, resetFilters = props.resetFilters, formatAndCallSetFilters = props.formatAndCallSetFilters;
    var _a = (0, react_1.useState)((0, utils_1.getDarkModeValue)()), darkMode = _a[0], setDarkMode = _a[1];
    (0, react_1.useEffect)(function () { (0, utils_1.detectDarkModeChange)(setDarkMode); }, []);
    var renderComponents = function (filterOption) {
        var options = filterOption.options;
        if (options === 'date') {
            var label = filterOption.label, fromValue = filterOption.fromValue, toValue = filterOption.toValue, onChangeFrom = filterOption.onChangeFrom, onChangeTo = filterOption.onChangeTo;
            return (0, FilterFunctions_1.DateTimeFilter)(label, fromValue, toValue, onChangeFrom, onChangeTo);
        }
        else if (options === 'multilineOperator') {
            var label = filterOption.label, linesValue = filterOption.linesValue, onChangeLines = filterOption.onChangeLines, operatorValue = filterOption.operatorValue, onChangeOperator = filterOption.onChangeOperator, operatorOptions = filterOption.operatorOptions;
            return (0, FilterFunctions_1.MultilineOperatorFilter)(label, linesValue, onChangeLines, operatorValue, onChangeOperator, operatorOptions);
        }
        else if (Array.isArray(options)) {
            var label = filterOption.label, value = filterOption.value, onChange = filterOption.onChange;
            return (0, FilterFunctions_1.renderSearchableFilter)(label, value, onChange, options);
        }
    };
    var style = {
        filter: darkMode ? 'invert(1)' : 'invert(0)'
    };
    return (react_1.default.createElement(material_1.Drawer, { style: style, anchor: "right", open: drawerState, onClose: toggleState },
        react_1.default.createElement(exports.SearchHeader, null,
            react_1.default.createElement(material_1.Typography, { variant: "h3" }, title),
            react_1.default.createElement(material_1.Box, { onClick: toggleState, sx: { '&:hover': { cursor: 'pointer' } } },
                react_1.default.createElement(Close_1.default, { color: "primary" }))),
        filterOptions.map(function (fop, i) {
            return (react_1.default.createElement(material_1.Accordion, { key: "search-filter-".concat(fop.label, "-").concat(i), disableGutters: true, sx: { overflow: 'scroll' } },
                react_1.default.createElement(material_1.AccordionSummary, { expandIcon: react_1.default.createElement(ExpandMore_1.default, null), "aria-controls": "panel1bh-content", id: "filter-header-".concat(fop.label) },
                    react_1.default.createElement(material_1.Typography, { variant: "body2", mr: 1, sx: tableStyles_1.firstLetterStyle }, fop.label)),
                react_1.default.createElement(material_1.AccordionDetails, null, renderComponents(fop))));
        }),
        react_1.default.createElement(exports.SearchFooter, null,
            react_1.default.createElement(material_1.Button, { color: "cancel", sx: { mr: 1 }, onClick: resetFilters },
                react_1.default.createElement(material_1.Typography, { variant: "button" }, btnTxtClear)),
            react_1.default.createElement(material_1.Button, { sx: { mr: 1 }, onClick: formatAndCallSetFilters, disabled: false },
                react_1.default.createElement(material_1.Typography, { variant: "button" }, btnTxtSearch)))));
};
exports.SearchFilter = SearchFilter;
//# sourceMappingURL=SearchFilterSideMenu.js.map