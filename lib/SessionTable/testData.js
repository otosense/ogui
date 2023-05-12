"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listData = exports.listSessions = void 0;
var mockAnnotations = function (start, stop, step, tag) {
    var annotations = [];
    var t = 1;
    for (var i = start; i < stop; i += step) {
        annotations.push({
            name: "tag ".concat(t),
            bt: i,
            tt: i + step
        });
        t = t % tag + 1;
    }
    return annotations;
};
var mockSessionGen = function (n) {
    if (n === void 0) { n = 10; }
    var sessions = [];
    var timeStep = 600000000;
    var sampleRates = [44100, 48000];
    for (var i = 0; i < n; i++) {
        var bt = 1677672000000000 + (i * timeStep);
        var tt = 1677672000000000 + ((i + 1) * timeStep);
        var channels = [];
        for (var j = 0; j < i % 4 + 1; j++) {
            channels.push({
                name: "ch".concat(j),
                description: 'microphone'
            });
        }
        sessions.push({
            id: "mockSession".concat(i),
            device_id: "deviceId".concat(i % 2 + 1),
            bt: bt,
            tt: tt,
            sr: sampleRates[i % 2],
            bit_depth: 8,
            channels: channels,
            annotations: mockAnnotations(bt, tt, timeStep / 10, i % 5 + 1)
        });
    }
    return sessions;
};
var mockSessions = mockSessionGen(100);
var filterByNamesOperator = function (names, operator, namedList) {
    if (operator === 'and' && !names.every(function (includeName) { return namedList.some(function (_a) {
        var name = _a.name;
        return name === includeName;
    }); })) {
        return false;
    }
    else if (operator === 'or' && !namedList.some(function (_a) {
        var name = _a.name;
        return names.includes(name);
    })) {
        return false;
    }
    return true;
};
var filterSessions = function (f, sessions) {
    if (sessions === void 0) { sessions = mockSessions; }
    var _sessions = __spreadArray([], sessions, true);
    return _sessions.filter(function (s) {
        var from_bt = f.from_bt, to_bt = f.to_bt, from_tt = f.from_tt, to_tt = f.to_tt, sr = f.sr, channels = f.channels, annotations = f.annotations;
        if (from_bt != null && s.bt < from_bt) {
            return false;
        }
        if (to_bt != null && s.bt > to_bt) {
            return false;
        }
        if (from_tt != null && s.tt < from_tt) {
            return false;
        }
        if (to_tt != null && s.tt > to_tt) {
            return false;
        }
        if (sr != null && s.sr !== sr) {
            return false;
        }
        if (channels != null && !filterByNamesOperator(channels.names, channels.operator, s.channels)) {
            return false;
        }
        if (annotations != null && !filterByNamesOperator(annotations.names, annotations.operator, s.annotations)) {
            return false;
        }
        return true;
    });
};
var sortSessions = function (sort, sessions) {
    var _sessions = __spreadArray([], sessions, true);
    if ((_sessions === null || _sessions === void 0 ? void 0 : _sessions.length) > 0) {
        var sortType = void 0;
        if (typeof sort.field === 'string') {
            sortType = typeof sessions[0][sort.field];
        }
        else {
            sortType = 'function';
        }
        if ((sortType) === 'function') {
            var cmpFunc_1 = sort.field;
            if (sort.mode === 'asc') {
                _sessions = _sessions.sort(function (a, b) { return cmpFunc_1(a, b); });
            }
            else {
                _sessions = _sessions.sort(function (b, a) { return cmpFunc_1(a, b); });
            }
        }
        else if ((sortType) === 'string') {
            var sortField_1 = sort.field;
            if (sort.mode === 'asc') {
                _sessions = _sessions.sort(function (a, b) {
                    var _a;
                    var x = a[sortField_1];
                    var y = b[sortField_1];
                    return (_a = x === null || x === void 0 ? void 0 : x.localeCompare(y !== null && y !== void 0 ? y : '')) !== null && _a !== void 0 ? _a : 0;
                });
            }
            else {
                _sessions = _sessions.sort(function (b, a) {
                    var _a;
                    var x = a[sortField_1];
                    var y = b[sortField_1];
                    return (_a = x === null || x === void 0 ? void 0 : x.localeCompare(y !== null && y !== void 0 ? y : '')) !== null && _a !== void 0 ? _a : 0;
                });
            }
        }
        else if (sortType === 'number') {
            var sortField_2 = sort.field;
            if (sort.mode === 'asc') {
                _sessions = _sessions.sort(function (a, b) {
                    var x = a[sortField_2];
                    var y = b[sortField_2];
                    return x - y;
                });
            }
            else {
                _sessions = _sessions.sort(function (b, a) {
                    var x = a[sortField_2];
                    var y = b[sortField_2];
                    return x - y;
                });
            }
        }
    }
    return _sessions;
};
var listSessions = function (filter, sort, pagination, sessions) {
    if (filter === void 0) { filter = null; }
    if (sort === void 0) { sort = null; }
    if (pagination === void 0) { pagination = null; }
    if (sessions === void 0) { sessions = mockSessions; }
    var s = (filter != null) ? filterSessions(filter, sessions) : __spreadArray([], sessions, true);
    if (sort != null) {
        s = sortSessions(sort, s);
    }
    if (pagination != null) {
        s = s.slice(pagination.from_idx, pagination.to_idx);
    }
    return s;
};
exports.listSessions = listSessions;
var listData = function (sort, pagination, data) {
    if (sort === void 0) { sort = null; }
    if (pagination === void 0) { pagination = null; }
    if (data === void 0) { data = []; }
    var s = __spreadArray([], data, true);
    if (sort != null) {
        s = sortSessions(sort, s);
    }
    if (pagination != null) {
        s = s.slice(pagination.from_idx, pagination.to_idx);
    }
    return s;
};
exports.listData = listData;
//# sourceMappingURL=testData.js.map