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
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const ComponentContainer_1 = __importDefault(require("./ComponentContainer"));
const StepContainer_1 = __importDefault(require("./StepContainer"));
const StepSelect_1 = __importDefault(require("./StepSelect"));
const AddButton_1 = __importDefault(require("./AddButton"));
const btnContainer = {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 24,
    width: 'calc(100% - 48px)'
};
const PipelineMaker = (props) => {
    const [indexes, setIndexes] = (0, react_1.useState)([1]);
    const handleSelectChange = (selected, i) => {
        const copy = [...props.selectedValues];
        copy[i - 1] = selected;
        props.setSelectedValues(copy);
    };
    const addStep = () => {
        const copyIndex = [...indexes];
        const copyVals = [...props.selectedValues];
        const plusOne = copyIndex.length + 1;
        copyVals.push('');
        copyIndex.push(plusOne);
        props.setSelectedValues(copyVals);
        setIndexes(copyIndex);
    };
    const deleteStep = (index) => {
        if (indexes.length > 1) {
            const copyIndex = [...indexes];
            const copyVals = [...props.selectedValues];
            copyVals.splice(index, 1);
            props.setSelectedValues(copyVals);
            copyIndex.pop();
            setIndexes(copyIndex);
        }
    };
    return (react_1.default.createElement(ComponentContainer_1.default, { title: "Create pipeline" },
        react_1.default.createElement(react_1.default.Fragment, null,
            !!indexes.length && indexes.map((index, i) => {
                return (react_1.default.createElement(StepContainer_1.default, { index: index, key: `step-${index}`, onClick: deleteStep },
                    react_1.default.createElement(StepSelect_1.default, { items: props.options, onChange: handleSelectChange, val: props.selectedValues[i], index: index })));
            }),
            react_1.default.createElement(AddButton_1.default, { addStep: addStep }),
            react_1.default.createElement(material_1.Box, { sx: btnContainer },
                react_1.default.createElement(material_1.Button, { onClick: props.handleSave }, "Save")))));
};
exports.default = PipelineMaker;
