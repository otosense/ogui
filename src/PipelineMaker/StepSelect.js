"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectBox = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
exports.selectBox = {
    width: '100%'
};
const StepSelect = (props) => {
    const { items, val, onChange, index } = props;
    const handleChange = (e) => {
        onChange(e.target.value, index);
    };
    return (react_1.default.createElement(material_1.Stack, { sx: { width: '100%', marginBottom: 0 } },
        react_1.default.createElement(material_1.Typography, { variant: "overline" },
            "Step ",
            index),
        react_1.default.createElement(material_1.FormControl, { fullWidth: true },
            react_1.default.createElement(material_1.Select, { id: "demo-simple-select", value: val || '', onChange: handleChange, sx: exports.selectBox }, !!items.length && items.map((item, i) => {
                return (react_1.default.createElement(material_1.MenuItem, { key: item, value: item }, item));
            })))));
};
exports.default = StepSelect;
