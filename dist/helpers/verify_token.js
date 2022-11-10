"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var verifyToken = function (req, _res, next) {
    if (!req.headers.authorization) {
        _res.status(401).json({ error: 'Access denied, plaese input token' });
        return false;
    }
    try {
        var bearer = req.headers.authorization.split(' ')[0].toLowerCase();
        var token = req.headers.authorization.split(' ')[1];
        if (token && bearer === 'bearer') {
            var decode = jsonwebtoken_1["default"].verify(token, process.env.TOKEN);
            if (decode) {
                next();
            }
            else {
                // Failed to authenticate user.
                _res.status(401);
                _res.json("Access denied, token it's not currect");
                return;
            }
        }
    }
    catch (err) {
        // Failed to authenticate user.
        _res.status(401);
        _res.json("Access denied, token it's not currect");
        return;
    }
};
exports.verifyToken = verifyToken;
