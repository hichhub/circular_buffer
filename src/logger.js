"use strict";
exports.__esModule = true;
var pino = require("pino");
var constants_1 = require("./constants");
exports.logger = pino({
    level: constants_1["default"].LOG_LEVEL,
    name: constants_1["default"].APP_ID
});
