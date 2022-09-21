"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectBox = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
exports.selectBox = {
    width: '100%'
};
var StepSelect = function (props) {
    var items = props.items, val = props.val, onChange = props.onChange, index = props.index;
    var handleChange = function (e) {
        onChange(e.target.value, index);
    };
    return (react_1.default.createElement(material_1.Stack, { sx: { width: '100%', marginBottom: 0 } },
        react_1.default.createElement(material_1.Typography, { variant: "overline" },
            "Step ",
            index),
        react_1.default.createElement(material_1.FormControl, { fullWidth: true },
            react_1.default.createElement(material_1.Select, { id: "demo-simple-select", value: val || '', onChange: handleChange, sx: exports.selectBox }, !!items.length && items.map(function (item, i) {
                return (react_1.default.createElement(material_1.MenuItem, { key: item, value: item }, item));
            })))));
};
exports.default = StepSelect;
//# sourceMappingURL=StepSelect.js.map