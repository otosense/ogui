"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var Add_1 = __importDefault(require("@mui/icons-material/Add"));
var addButtonStyle = {
    width: 'calc(100% - 48px)',
    padding: 1
};
var AddButton = function (props) {
    return (react_1.default.createElement(material_1.Button, { color: "secondary", sx: addButtonStyle, startIcon: react_1.default.createElement(Add_1.default, null), onClick: props.addStep }, "Add"));
};
exports.default = AddButton;
//# sourceMappingURL=AddButton.js.map