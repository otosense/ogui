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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var material_1 = require("@mui/material");
var AddOptionInput = function (props) {
    var _a = (0, react_1.useState)(''), textVal = _a[0], setTextVal = _a[1];
    var changeTextField = function (e) {
        setTextVal(e.target.value);
    };
    var addAnOption = function () {
        props.addOption(textVal);
        setTextVal('');
    };
    return (react_1.default.createElement(material_1.Stack, { sx: { width: 'calc(100% - 48px)',
            padding: 1 } },
        react_1.default.createElement(material_1.Stack, { direction: "row", sx: { alignItems: 'end' } },
            react_1.default.createElement(material_1.Stack, { sx: { width: '100%' } },
                react_1.default.createElement(material_1.Typography, { variant: "overline" }, "Type an option to add"),
                react_1.default.createElement(material_1.TextField, { value: textVal, onChange: changeTextField })),
            react_1.default.createElement(material_1.Button, { onClick: addAnOption, disabled: !textVal, sx: { minWidth: 'max-content' } }, "Add option"))));
};
exports.default = AddOptionInput;
//# sourceMappingURL=AddOptionInput.js.map