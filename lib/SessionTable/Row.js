"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var KeyboardArrowDown_1 = __importDefault(require("@mui/icons-material/KeyboardArrowDown"));
var KeyboardArrowUp_1 = __importDefault(require("@mui/icons-material/KeyboardArrowUp"));
var components_1 = require("@otosense/components");
var Radio_1 = __importDefault(require("@mui/material/Radio"));
var tableStyles_1 = require("./tableStyles");
var CollapsedContents_1 = require("./CollapsedContents");
var selectComponent = function (type, isSelected, onSelect) {
    if (type === 'checkbox') {
        return react_1.default.createElement(material_1.Checkbox, { color: "primary", checked: isSelected === true, onChange: onSelect });
    }
    else if (type === 'radio') {
        return react_1.default.createElement(Radio_1.default, { color: "primary", checked: isSelected === true, onChange: onSelect });
    }
    return react_1.default.createElement(react_1.default.Fragment, null);
};
var Row = function (props) { return (react_1.default.createElement(react_1.default.Fragment, { key: "".concat(props.id) },
    react_1.default.createElement(material_1.TableRow, { sx: { width: '100%', borderBottom: '0.5px solid #ccc' }, hover: true },
        react_1.default.createElement(material_1.TableCell, { sx: tableStyles_1.cellIconSpacing },
            react_1.default.createElement(components_1.CenterBox, null, selectComponent(props.selectComponent, props.isSelected, props.onSelectItem))),
        props.renderExpandedData != null && react_1.default.createElement(material_1.TableCell, { sx: tableStyles_1.cellIconSpacing },
            react_1.default.createElement(material_1.IconButton, { "aria-label": "expand row", size: "small", onClick: props.onClickExpand }, props.isExpanded
                ? react_1.default.createElement(KeyboardArrowUp_1.default, { color: "primary" })
                : react_1.default.createElement(KeyboardArrowDown_1.default, { color: "primary" }))),
        props.columns.map(function (c, i) { return (react_1.default.createElement(material_1.TableCell, { sx: c.sx, key: "".concat(props.id, "-col-").concat(i) }, (typeof c.key === 'string') ? props.data[c.key] : c.key(props.data))); })),
    props.renderExpandedData != null &&
        react_1.default.createElement(CollapsedContents_1.CollapsedContents, { isExpanded: props.isExpanded, renderData: props.renderExpandedData }))); };
exports.Row = Row;
//# sourceMappingURL=Row.js.map