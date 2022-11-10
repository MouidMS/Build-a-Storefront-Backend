"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bcrypt_1 = __importDefault(require("bcrypt"));
var hash = function (hashPassword) {
    var salt = parseInt(process.env.SALT_ROUNDS, 10);
    return bcrypt_1["default"].hashSync("".concat(hashPassword + process.env.BCRYPT_PASSWORD), salt);
};
exports["default"] = hash;
