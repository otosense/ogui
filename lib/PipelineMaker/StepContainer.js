"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
var material_1 = require("@mui/material");
var stepBoxStyle = {
    width: 'calc(100% - 96px)',
    marginTop: 0.5,
    marginBottom: 0.5,
    marginLeft: 1,
    marginRight: 1,
    background: 'white',
    paddingTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 0,
    display: 'flex'
};
var iconBox = {
    width: 80,
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 90,
    cursor: 'pointer',
};
var StepContainer = function (props) {
    var index = props.index, onClick = props.onClick, children = props.children;
    var deleteStep = function () {
        var arrIndex = index - 1;
        onClick(arrIndex);
    };
    return (react_1.default.createElement(material_1.Box, { sx: stepBoxStyle },
        children,
        react_1.default.createElement(material_1.Box, { sx: iconBox, onClick: deleteStep }, props.index !== 1 && react_1.default.createElement(Delete_1.default, { sx: { color: '#003965' } }))));
};
exports.default = StepContainer;
//# sourceMappingURL=StepContainer.js.map