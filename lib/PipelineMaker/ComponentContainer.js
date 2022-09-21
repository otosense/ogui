"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var containerStyle = {
    width: 800,
    height: 'calc(100% - 48px)',
    display: 'flex',
    justifyContent: 'flex-start',
    background: '#F3F3F3',
    minHeight: 400,
    maxHeight: 'auto',
    flexDirection: 'column',
    border: '1px solid #F3F3F3',
    alignItems: 'center',
    overflow: 'auto'
};
var titleStyle = {
    background: 'white',
    height: 40,
    width: 'calc(100% - 48px)',
    display: 'flex',
    alignItems: 'center',
    padding: 1
};
var ConpomentContainer = function (props) {
    var title = props.title, children = props.children;
    return (react_1.default.createElement(material_1.Box, { sx: containerStyle },
        react_1.default.createElement(material_1.Box, { sx: titleStyle },
            react_1.default.createElement(material_1.Typography, { variant: "h2" }, title)),
        children));
};
exports.default = ConpomentContainer;
//# sourceMappingURL=ComponentContainer.js.map