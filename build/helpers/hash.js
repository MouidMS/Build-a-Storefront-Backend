"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash = (hashPassword) => {
    const salt = parseInt(process.env.SALT_ROUNDS, 10);
    return bcrypt_1.default.hashSync(`${hashPassword + process.env.BCRYPT_PASSWORD}`, salt);
};
exports.default = hash;
