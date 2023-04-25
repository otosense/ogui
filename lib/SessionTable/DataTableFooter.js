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
exports.DataTableFooter = void 0;
var React = __importStar(require("react"));
var styles_1 = require("@mui/material/styles");
var material_1 = require("@mui/material");
var KeyboardArrowLeft_1 = __importDefault(require("@mui/icons-material/KeyboardArrowLeft"));
var KeyboardArrowRight_1 = __importDefault(require("@mui/icons-material/KeyboardArrowRight"));
var tableStyles_1 = require("./tableStyles");
var DataTablePaginationActions = function (props) {
    var theme = (0, styles_1.useTheme)();
    var handleBackButtonClick = function (event) {
        var prevPageNum = props.page - 1;
        props.onPageChange(event, prevPageNum);
    };
    var handleNextButtonClick = function (event) {
        var nextPageNum = props.page + 1;
        props.onPageChange(event, nextPageNum);
    };
    return (React.createElement(material_1.Box, { sx: { flexShrink: 0 } },
        React.createElement(material_1.IconButton, { onClick: handleBackButtonClick, disabled: props.page === 0, "aria-label": "previous page" }, theme.direction === 'rtl' ? React.createElement(KeyboardArrowRight_1.default, null) : React.createElement(KeyboardArrowLeft_1.default, null)),
        React.createElement(material_1.IconButton, { onClick: handleNextButtonClick, disabled: props.count !== -1 && (props.page + 1) * props.rowsPerPage >= props.count, "aria-label": "next page" }, theme.direction === 'rtl' ? React.createElement(KeyboardArrowLeft_1.default, null) : React.createElement(KeyboardArrowRight_1.default, null))));
};
var DataTableFooter = function (props) {
    var _a;
    return (React.createElement(material_1.TableFooter, { sx: tableStyles_1.centerTableFooter },
        React.createElement(material_1.TableRow, null,
            props.selectedItemsCount > 0 && (React.createElement(material_1.TableCell, null,
                props.selectedItemsCount,
                " ",
                props.selectedItemsCount === 1 ? 'item' : 'items',
                " selected")),
            React.createElement(material_1.TablePagination, { rowsPerPageOptions: [10, 20, 30, 40, 50], colSpan: 10, count: (_a = props.count) !== null && _a !== void 0 ? _a : -1, rowsPerPage: props.rowsPerPage, page: props.page, SelectProps: {
                    inputProps: {
                        'aria-label': 'rows per page'
                    },
                    native: true
                }, onPageChange: props.onPageChange, onRowsPerPageChange: props.onRowsPerPageChange, ActionsComponent: DataTablePaginationActions, labelDisplayedRows: function (_a) {
                    var from = _a.from, to = _a.to;
                    return "".concat(from, "-").concat(to);
                } }))));
};
exports.DataTableFooter = DataTableFooter;
//# sourceMappingURL=DataTableFooter.js.map