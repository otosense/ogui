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
var react_1 = __importStar(require("react"));
var material_1 = require("@mui/material");
var Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
var Search_1 = __importDefault(require("@mui/icons-material/Search"));
var Add_1 = __importDefault(require("@mui/icons-material/Add"));
var StepSelect = function (props) {
    var stepNumber = props.stepNumber, items = props.items, value = props.value, renderItem = props.renderItem, stringRepr = props.stringRepr, onChange = props.onChange, onDelete = props.onDelete, onOpen = props.onOpen, onClose = props.onClose;
    var initSelectedIdx = value === '' ? value : props.items.indexOf(value);
    var _a = (0, react_1.useState)(initSelectedIdx), selectedIdx = _a[0], setSelectedIdx = _a[1];
    var _b = (0, react_1.useState)(false), isHovering = _b[0], setIsHovering = _b[1];
    var _c = (0, react_1.useState)(""), searchText = _c[0], setSearchText = _c[1];
    var containsText = function (item, searchText) {
        var stringItem = stringRepr(item).toLowerCase();
        return stringItem.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    };
    var filteredItems = (0, react_1.useMemo)(function () { return items.filter(function (item) { return containsText(item, searchText); }); }, [searchText]);
    var id = 'step-' + stepNumber;
    var labelId = 'step-label-' + stepNumber;
    var label = 'Step #' + stepNumber;
    var handleChange = function (event) {
        setIsHovering(false);
        var idx = event.target.value;
        setSelectedIdx(idx);
        var item = items[idx];
        onChange(stepNumber, item);
    };
    var handleDelete = function () {
        onDelete(stepNumber);
    };
    var handleMouseOver = function () {
        setIsHovering(true);
    };
    var handleMouseOut = function () {
        setIsHovering(false);
    };
    var handleOpen = function () {
        onOpen(stepNumber);
    };
    var handleClose = function () {
        setSearchText("");
        onClose(stepNumber);
    };
    var handleAddItem = function () {
    };
    var deleteButton = (react_1.default.createElement(material_1.IconButton, { onClick: handleDelete, sx: {
            visibility: selectedIdx !== '' && isHovering ? "visible" : "hidden",
            position: 'absolute',
            right: '30px'
        } },
        react_1.default.createElement(Delete_1.default, null)));
    var menuProps = {
        autoFocus: false,
        style: {
            filter: props.darkMode ? 'invert(1)' : 'invert(0)',
        }
    };
    return (react_1.default.createElement(material_1.Box, { sx: { flexGrow: 1 } },
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2, alignItems: "center" },
            react_1.default.createElement(material_1.Grid, { item: true, xs: true },
                react_1.default.createElement(material_1.FormControl, { fullWidth: true, sx: { my: 1 } },
                    react_1.default.createElement(material_1.InputLabel, { id: labelId }, label),
                    react_1.default.createElement(material_1.Select, { id: id, labelId: labelId, label: label, value: selectedIdx, renderValue: function () { return renderItem(items[selectedIdx]); }, MenuProps: menuProps, endAdornment: deleteButton, onChange: handleChange, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, onOpen: handleOpen, onClose: handleClose },
                        react_1.default.createElement(material_1.ListSubheader, null,
                            react_1.default.createElement(material_1.TextField, { size: "small", autoFocus: true, placeholder: "Type to search...", fullWidth: true, InputProps: {
                                    startAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: "start" },
                                        react_1.default.createElement(Search_1.default, null)))
                                }, onChange: function (e) { return setSearchText(e.target.value); }, onKeyDown: function (e) {
                                    if (e.key !== "Escape") {
                                        e.stopPropagation();
                                    }
                                } }),
                            react_1.default.createElement(material_1.Button, { onClick: handleAddItem },
                                react_1.default.createElement(Add_1.default, null),
                                " Add a new item")),
                        filteredItems.map(function (item, i) {
                            var key = 'step-' + stepNumber + '-item-' + i;
                            var viewItem = renderItem(item);
                            return (react_1.default.createElement(material_1.MenuItem, { key: key, value: i }, viewItem));
                        })))))));
};
exports.default = StepSelect;
//# sourceMappingURL=StepSelect.js.map