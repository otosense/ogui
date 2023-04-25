"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectDarkModeChange = exports.getDarkModeValue = void 0;
function getDarkModeValue() {
    return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
exports.getDarkModeValue = getDarkModeValue;
function detectDarkModeChange(setDarkMode) {
    var modeMe = function (e) {
        setDarkMode(!!e.matches);
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', modeMe);
}
exports.detectDarkModeChange = detectDarkModeChange;
//# sourceMappingURL=utils.js.map