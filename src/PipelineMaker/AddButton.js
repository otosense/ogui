"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const Add_1 = __importDefault(require("@mui/icons-material/Add"));
const addButtonStyle = {
    width: 'calc(100% - 48px)',
    padding: 1
};
const AddButton = (props) => {
    return (react_1.default.createElement(material_1.Button, { color: "secondary", sx: addButtonStyle, startIcon: react_1.default.createElement(Add_1.default, null), onClick: props.addStep }, "Add"));
};
exports.default = AddButton;
