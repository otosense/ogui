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
exports.DateTimeFilter = exports.renderSearchableFilter = exports.MultilineOperatorFilter = void 0;
var react_1 = __importStar(require("react"));
var material_1 = require("@mui/material");
var AdapterDateFns_1 = require("@mui/x-date-pickers/AdapterDateFns");
var LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
var DateTimePicker_1 = require("@mui/x-date-pickers/DateTimePicker");
var MultilineOperatorFilter = function (label, linesValue, onChangeLines, operatorValue, onChangeOperator, operatorOptions) {
    var _a = (0, react_1.useState)(''), lines = _a[0], setlines = _a[1];
    (0, react_1.useEffect)(function () {
        setlines((linesValue != null) ? linesValue.join('\n') : '');
    }, [linesValue]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.TextField, { sx: { height: 'auto', width: '100%' }, placeholder: 'Separate values with newline', variant: "filled", value: lines, multiline: true, rows: 4, onChange: function (event) { setlines(event.target.value); }, onBlur: function () { onChangeLines(lines.replace(/^\s+|\s+$/g, '').split(/\n+/)); } }),
        react_1.default.createElement(material_1.Autocomplete, { options: operatorOptions, id: "filter-".concat(label), onChange: function (e, newValue) {
                if (newValue != null) {
                    onChangeOperator(newValue);
                }
                else {
                    onChangeOperator(operatorOptions[0]);
                }
            }, value: operatorValue !== null && operatorValue !== void 0 ? operatorValue : operatorOptions[0], renderInput: function (params) { return (react_1.default.createElement(material_1.TextField, __assign({}, params, { placeholder: 'Operator', variant: "filled" }))); } })));
};
exports.MultilineOperatorFilter = MultilineOperatorFilter;
var renderSearchableFilter = function (label, value, onChange, options) { return (react_1.default.createElement(material_1.Autocomplete, { options: options, id: "filter-".concat(label), onChange: function (e, newValue) {
        if (newValue != null) {
            onChange(newValue);
        }
        else {
            onChange('');
        }
    }, value: value !== null && value !== void 0 ? value : '', renderInput: function (params) { return (react_1.default.createElement(material_1.TextField, __assign({}, params, { placeholder: label, variant: "filled" }))); } })); };
exports.renderSearchableFilter = renderSearchableFilter;
var DateTimeFilter = function (label, fromValue, toValue, onChangeFrom, onChangeTo) {
    var _a = (0, react_1.useState)(null), startDate = _a[0], setStartDate = _a[1];
    var _b = (0, react_1.useState)(null), endDate = _b[0], setEndDate = _b[1];
    var _c = (0, react_1.useState)(false), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(''), errorText = _d[0], setErrorText = _d[1];
    var makeSecondsZero = function (str) {
        var timeText = str.toString().split(' ');
        var time = timeText[4].slice(0, -2).concat('00');
        var formatted = timeText;
        formatted[4] = time;
        var joined = formatted.join(' ');
        return new Date(joined);
    };
    var changeStartDate = function (val) {
        setStartDate(val);
        var formatted = makeSecondsZero(val);
        var epoch = formatted.getTime() * 1000;
        onChangeFrom(epoch);
    };
    var changeEndDate = function (val) {
        var formatted = makeSecondsZero(val);
        var epoch = formatted.getTime() * 1000;
        if (fromValue == null || fromValue <= epoch) {
            setError(false);
            setErrorText('');
            setEndDate(val);
            onChangeTo(epoch);
        }
        else {
            setErrorText('Start Date Must Be Earlier Than End Date');
            setError(true);
        }
    };
    (0, react_1.useEffect)(function () {
        if (fromValue == null && toValue == null) {
            setEndDate(null);
            setStartDate(null);
        }
        else if (fromValue != null && toValue != null) {
        }
        else if (fromValue != null && toValue == null) {
            setErrorText('Select End Date And Time');
            setError(true);
        }
        else if (toValue != null && fromValue == null) {
            setErrorText('Select Start Date And Time');
            setError(true);
        }
        else if (toValue != null && fromValue != null) {
            setError(false);
            setErrorText('');
        }
    }, [toValue, fromValue]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Stack, { mb: 1 },
            react_1.default.createElement(material_1.Typography, { variant: "overline" }, 'Start Date'),
            react_1.default.createElement(LocalizationProvider_1.LocalizationProvider, { dateAdapter: AdapterDateFns_1.AdapterDateFns },
                react_1.default.createElement(DateTimePicker_1.DateTimePicker, { renderInput: function (props) { return react_1.default.createElement(material_1.TextField, __assign({}, props)); }, value: startDate, onChange: function (newValue) {
                        if (!(newValue == null) && typeof newValue !== 'string') {
                            changeStartDate(newValue);
                        }
                    } }))),
        react_1.default.createElement(material_1.Stack, null,
            react_1.default.createElement(material_1.Typography, { variant: "overline" }, 'End Date'),
            react_1.default.createElement(LocalizationProvider_1.LocalizationProvider, { dateAdapter: AdapterDateFns_1.AdapterDateFns },
                react_1.default.createElement(DateTimePicker_1.DateTimePicker, { renderInput: function (props) { return react_1.default.createElement(material_1.TextField, __assign({}, props)); }, value: endDate, onChange: function (newValue) {
                        if (!(newValue == null) && typeof newValue !== 'string') {
                            changeEndDate(newValue);
                        }
                    } })),
            error &&
                react_1.default.createElement(material_1.Typography, { variant: "caption", color: "error" }, errorText))));
};
exports.DateTimeFilter = DateTimeFilter;
//# sourceMappingURL=FilterFunctions.js.map