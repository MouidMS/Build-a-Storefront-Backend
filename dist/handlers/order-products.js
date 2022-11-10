"use strict";
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
exports.__esModule = true;
var order_products_1 = require("../models/order-products");
var token_1 = require("../utils/token");
var opStore = new order_products_1.OrderProductStore();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var quantity, order_id, product_id, product, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                quantity = req.body.quantity;
                order_id = req.body.order_id;
                product_id = req.body.product_id;
                if (!quantity || !order_id || !product_id) {
                    res.status(400);
                    res.send('Some required parameters are missing.');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, opStore.create({
                        quantity: quantity,
                        order_id: order_id,
                        product_id: product_id,
                        products: []
                    })];
            case 1:
                product = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var read = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, productId, product, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = req.params.orderId;
                productId = req.params.productId;
                if (!orderId || !productId) {
                    return [2 /*return*/, res.status(400).send('Missing required parameter :id.')];
                }
                return [4 /*yield*/, opStore.show(orderId, productId)];
            case 1:
                product = _a.sent();
                res.json(product);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/*
const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;
    if (!name || !price || !id) {
      res.status(400);
      res.send('Some required parameters are missing eg. :name, :price, :id');
      return false;
    }
    const product: Product = await productStore.update(id, {
      name,
      price,
    });

    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
*/
var deleteProductOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, productId, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = req.params.orderId;
                productId = req.params.productId;
                if (!orderId || productId) {
                    res.status(400);
                    res.send('Missing parameter :id.');
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, opStore["delete"](orderId, productId)];
            case 1:
                _a.sent();
                res.send("Product with id ".concat(productId, " successfully Deleted."));
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
function user_routes(app) {
    app.get('/productOrder/show', read);
    app.post('/productOrder/create', create);
    app.get('/productOrder/index/:id', index);
    /*app.put('/product-order/:id', update);*/
    app["delete"]('/productOrder/:id', token_1.verifyToken, deleteProductOrder);
}
exports["default"] = user_routes;
