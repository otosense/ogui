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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var StepSelect_1 = __importDefault(require("./StepSelect"));
var PipelineMaker = function (props) {
    var _a = (0, react_1.useState)(!!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches), darkMode = _a[0], setDarkMode = _a[1];
    (0, react_1.useEffect)(function () {
        var modeMe = function (e) {
            setDarkMode(!!e.matches);
        };
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', modeMe);
    }, []);
    var _b = (0, react_1.useState)(__spreadArray(__spreadArray([], props.steps, true), [''], false)), steps = _b[0], setSteps = _b[1];
    var _c = (0, react_1.useState)(true), display = _c[0], setDisplay = _c[1];
    (0, react_1.useEffect)(function () {
        setDisplay(true);
    }, [steps]);
    var handleChangeStep = function (stepNumber, value) {
        steps[stepNumber - 1] = value;
        if (stepNumber === steps.length) {
            props.onPipelineChange(steps);
            props.onAddStep(value, stepNumber);
            setSteps(function (oldSteps) { return __spreadArray(__spreadArray([], oldSteps, true), [''], false); });
        }
        else {
            props.onPipelineChange(steps.slice(0, -1));
            props.onModifyStep(value, stepNumber);
        }
    };
    var handleDeleteStep = function (stepNumber) {
        var newSteps = __spreadArray([], steps, true);
        var deletedStep = newSteps.splice(stepNumber - 1, 1)[0];
        setDisplay(false);
        setSteps(newSteps);
        props.onModifyStep(deletedStep, stepNumber);
        props.onPipelineChange(newSteps.slice(0, -1));
    };
    var style = __assign({ filter: darkMode ? 'invert(1)' : 'invert(0)' }, props.style);
    return (react_1.default.createElement("div", { style: style }, display && steps.map(function (step, i) {
        var stepNumber = i + 1;
        var key = 'step-select-' + stepNumber;
        return (react_1.default.createElement(StepSelect_1.default, { key: key, stepNumber: stepNumber, value: step, items: props.items, renderItem: props.renderItem, stringRepr: props.stringRepr, darkMode: darkMode, onChange: handleChangeStep, onDelete: handleDeleteStep, onOpen: props.onShowItems, onClose: props.onHideItems }));
    })));
};
var toString = function (x) {
    return x.toString();
};
PipelineMaker.defaultProps = {
    items: [],
    steps: [],
    renderItem: toString,
    stringRepr: toString,
    style: {},
    onAddStep: function (step, stepNumber) { },
    onModifyStep: function (step, stepNumber) { },
    onDeleteStep: function (step, stepNumber) { },
    onShowItems: function (stepNumber) { },
    onHideItems: function (stepNumber) { },
    onPipelineChange: function (steps) { },
};
exports.default = PipelineMaker;
//# sourceMappingURL=index.js.map