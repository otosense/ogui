"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsedContents = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var tableStyles_1 = require("./tableStyles");
var CollapsedContents = function (props) {
    return (react_1.default.createElement(material_1.TableRow, { sx: { width: '100%' } },
        react_1.default.createElement(material_1.TableCell, { sx: { p: 0 }, colSpan: 11 },
            react_1.default.createElement(tableStyles_1.StyledCollapse, { in: props.isExpanded, timeout: "auto", unmountOnExit: true }, props.isExpanded && props.renderData()))));
};
exports.CollapsedContents = CollapsedContents;
//# sourceMappingURL=CollapsedContents.js.map