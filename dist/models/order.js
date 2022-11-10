"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    /*******************************/
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not get orders. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, order, sql2, productRows, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        sql = 'SELECT * FROM orders WHERE id=$1';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        rows = (_a.sent()).rows;
                        order = rows[0];
                        sql2 = 'SELECT product_id, quantity FROM order_products WHERE order_id=$1';
                        return [4 /*yield*/, connection.query(sql2, [id])];
                    case 3:
                        productRows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, __assign(__assign({}, order), { product: productRows })];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("can not find order ".concat(id, ". ").concat(err_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.updateOrder = function (id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, order, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [status, id])];
                    case 2:
                        rows = (_a.sent()).rows;
                        order = rows[0];
                        connection.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3);
                        throw new Error("Could not update order for user. ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.updateOrderProduct = function (quantity, order_id, product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, order, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE order_products SET quantity = $1 WHERE order_id = $2  AND product_id= $3 RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [quantity, order_id, product_id])];
                    case 2:
                        rows = (_a.sent()).rows;
                        order = rows[0];
                        connection.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_4 = _a.sent();
                        console.log(err_4);
                        throw new Error("Could not update order_product. ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var orderProductsSql, connection, sql, result, order, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        orderProductsSql = 'DELETE FROM order_products WHERE order_id=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(orderProductsSql, [id])];
                    case 2:
                        _a.sent();
                        sql = 'DELETE FROM orders WHERE id=($1)';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 3:
                        result = _a.sent();
                        order = result.rows[0];
                        connection.release();
                        return [2 /*return*/, order];
                    case 4:
                        err_5 = _a.sent();
                        throw new Error("Could not delete order ".concat(id, ". Error: ").concat(err_5));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.FindOrderByUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result, order, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM orders WHERE user_id=($1)";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connection.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Could not find product ".concat(id, ". Error: ").concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.FindProductByOrderId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT * FROM order_products WHERE order_id=($1) ';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        product = result.rows[0];
                        connection.release();
                        return [2 /*return*/, product];
                }
            });
        });
    };
    OrderStore.prototype.create = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result, order, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [o.user_id, o.status])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connection.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not add new order. Error: ".concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.addProductInOrder = function (add) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result, product, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'INSERT INTO order_products (quantity, order_id, product_id ) VALUES ($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [add.quantity, add.order_id, add.product_id])];
                    case 2:
                        result = _a.sent();
                        product = result.rows[0];
                        connection.release();
                        return [2 /*return*/, product];
                    case 3:
                        err_8 = _a.sent();
                        throw new Error("OrderProduct model not working. Error: ".concat(err_8));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
