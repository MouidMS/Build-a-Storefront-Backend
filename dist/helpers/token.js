"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getTokenByUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var getTokenByUser = function (user) {
    return jsonwebtoken_1["default"].sign({ user: user }, process.env.TOKEN);
};
exports.getTokenByUser = getTokenByUser;
