"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var product_1 = __importDefault(require("./handlers/product"));
var user_1 = __importDefault(require("./handlers/user"));
var order_1 = __importDefault(require("./handlers/order"));
var app = (0, express_1["default"])();
var port = 3000;
if (process.env.ENV === 'test') {
    port = 3001;
}
var server = "127.0.0.1:".concat(port);
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.status(200).send('<h1>Working Successfully</h1>');
});
(0, product_1["default"])(app);
(0, user_1["default"])(app);
(0, order_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(server));
});
exports["default"] = app;
