"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var logger_1 = require("../logger");
var circularbuffer_1 = require("./circularbuffer");
var PersistableCircularBuffer = /** @class */ (function (_super) {
    __extends(PersistableCircularBuffer, _super);
    function PersistableCircularBuffer(size, store, storeName) {
        if (storeName === void 0) { storeName = 'PersistableCircularBuffer'; }
        var _this = _super.call(this, size) || this;
        _this.store = store;
        _this.storeName = storeName;
        return _this;
    }
    Object.defineProperty(PersistableCircularBuffer.prototype, "storeName", {
        set: function (newName) {
            this.STORENAME = newName;
            this.arrayStoreName = this.STORENAME + "_arraybuffer";
            this.mapStoreName = this.STORENAME + "_mapbuffer";
        },
        enumerable: true,
        configurable: true
    });
    PersistableCircularBuffer.prototype.load = function (store, storeName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, error_1, _f, _g, _h, error_2;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        this.store = store;
                        this.storeName = storeName;
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 4, , 5]);
                        _b = (_a = logger_1.logger).debug;
                        return [4 /*yield*/, this.store.get(this.arrayStoreName)];
                    case 2:
                        _b.apply(_a, [_j.sent()]);
                        _c = this;
                        _e = (_d = JSON).parse;
                        return [4 /*yield*/, this.store.get(this.arrayStoreName)];
                    case 3:
                        _c.arrayBuffer = _e.apply(_d, [_j.sent()]);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _j.sent();
                        logger_1.logger.error(error_1);
                        return [2 /*return*/, false];
                    case 5:
                        _j.trys.push([5, 7, , 8]);
                        _f = this;
                        _h = (_g = JSON).parse;
                        return [4 /*yield*/, this.store.get(this.mapStoreName)];
                    case 6:
                        _f.mapBuffer = _h.apply(_g, [_j.sent()]);
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _j.sent();
                        logger_1.logger.error(error_2);
                        return [2 /*return*/, false];
                    case 8: return [2 /*return*/, true];
                }
            });
        });
    };
    PersistableCircularBuffer.prototype.set = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.set.call(this, key, value);
                this.store.set(this.arrayStoreName, JSON.stringify(this.arrayBuffer));
                this.store.set(this.mapStoreName, JSON.stringify(this.mapBuffer));
                return [2 /*return*/, value];
            });
        });
    };
    PersistableCircularBuffer.prototype.del = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.del.call(this, key);
                this.store.set(this.arrayStoreName, JSON.stringify(this.arrayBuffer));
                this.store.set(this.mapStoreName, JSON.stringify(this.mapBuffer));
                return [2 /*return*/, true];
            });
        });
    };
    PersistableCircularBuffer.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.flush.call(this);
                this.store.set(this.arrayStoreName, JSON.stringify(this.arrayBuffer));
                this.store.set(this.mapStoreName, JSON.stringify(this.mapBuffer));
                return [2 /*return*/, true];
            });
        });
    };
    return PersistableCircularBuffer;
}(circularbuffer_1["default"]));
exports["default"] = PersistableCircularBuffer;
