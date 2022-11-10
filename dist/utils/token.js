"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyToken = exports.getTokenByProduct = exports.getTokenByUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var getTokenByUser = function (user) {
    return jsonwebtoken_1["default"].sign({ user: user }, process.env.TOKEN);
};
exports.getTokenByUser = getTokenByUser;
var getTokenByProduct = function (prodcut) {
    return jsonwebtoken_1["default"].sign({ prodcut: prodcut }, process.env.TOKEN);
};
exports.getTokenByProduct = getTokenByProduct;
var verifyToken = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Access denied, invalid token' });
        return false;
    }
    try {
        var token = req.headers.authorization.split(' ')[1];
        jsonwebtoken_1["default"].verify(token, process.env.TOKEN);
        next();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
exports.verifyToken = verifyToken;
