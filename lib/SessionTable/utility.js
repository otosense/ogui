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
exports.formatSessionTime = exports.formatTimestamp = void 0;
var moment = __importStar(require("moment"));
var formatTimestamp = function (timestamp, showDateTimeInUTC) {
    if (showDateTimeInUTC === void 0) { showDateTimeInUTC = false; }
    if (showDateTimeInUTC) {
        return (!isNaN(timestamp))
            ? moment.utc(new Date(timestamp)).format('YYYY-MM-DD, HH:mm:ss') + ' -UTC'
            : '-';
    }
    return (!isNaN(timestamp)) ? moment.unix(timestamp / 1000).format('YYYY-MM-DD, HH:mm:ss') : '-';
};
exports.formatTimestamp = formatTimestamp;
var formatSessionTime = function (bt, showDateTimeInUTC) {
    if (showDateTimeInUTC === void 0) { showDateTimeInUTC = false; }
    return (0, exports.formatTimestamp)(bt / 1000, showDateTimeInUTC);
};
exports.formatSessionTime = formatSessionTime;
//# sourceMappingURL=utility.js.map