"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledCollapse = exports.centerTableFooter = exports.firstLetterStyle = exports.DataTableContainer = exports.cellDateTime = exports.cellIconSpacing = exports.cellMW160 = void 0;
var styles_1 = require("@mui/material/styles");
var material_1 = require("@mui/material");
exports.cellMW160 = {
    maxWidth: 160,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
};
exports.cellIconSpacing = {
    paddingLeft: 0.3,
    paddingRight: 0.3,
    maxWidth: 24
};
exports.cellDateTime = {
    maxWidth: 192,
    minWidth: 192,
    overflow: 'hidden',
    background: 'transparent'
};
exports.DataTableContainer = (0, styles_1.styled)(material_1.TableContainer)({
    height: 'calc(100vh - 130px)',
    overflow: 'auto',
    ml: -1,
    mr: -1,
    borderTop: '1px solid #eee',
    width: '100%'
});
exports.firstLetterStyle = {
    textTransform: 'none',
    '::first-letter': {
        textTransform: 'uppercase'
    }
};
exports.centerTableFooter = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    borderTop: '1px solid lightgray',
    background: 'white'
};
exports.StyledCollapse = (0, styles_1.styled)(material_1.Collapse)({
    backgroundColor: 'rgba(0,161,192, 0.05)',
    paddingLeft: '100px'
});
//# sourceMappingURL=tableStyles.js.map