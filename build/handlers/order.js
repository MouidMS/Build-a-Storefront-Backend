"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verify_token_1 = require("../helpers/verify_token");
const order_1 = require("../models/order");
const orderStore = new order_1.OrderStore();
const index = async (req, res) => {
    try {
        const orders = await orderStore.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const read = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const order = await orderStore.show(id);
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const updateOrder = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const status = req.body.status;
        const order = await orderStore.updateOrder(id, status);
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const updateOrderProduct = async (req, res) => {
    try {
        const quantity = req.body.quantity;
        const order_id = parseInt(req.params.id);
        const product_id = req.body.product_id;
        const order = await orderStore.updateOrderProduct(quantity, order_id, product_id);
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const deleteOrder = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await orderStore.delete(id);
        res.send(`successfully deleted`);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const showOrdersByUser = async (req, res) => {
    try {
        const orders = await orderStore.FindOrderByUser(req.params.userId);
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const showProductsByOrderId = async (req, res) => {
    try {
        const products = await orderStore.FindProductByOrderId(req.params.id);
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res) => {
    const order = {
        user_id: req.body.userId,
        status: req.body.status
    };
    try {
        const Order = await orderStore.create(order);
        res.json(Order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const addProductToOrder = async (req, res) => {
    const op = {
        quantity: req.body.quantity,
        order_id: req.body.orderid,
        product_id: req.body.productid
    };
    try {
        const order = await orderStore.addProductInOrder(op);
        res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
function order_routes(app) {
    app.get('/orders', verify_token_1.verifyToken, index);
    app.post('/orders/create', verify_token_1.verifyToken, create);
    app.post("/orders/products", verify_token_1.verifyToken, addProductToOrder);
    app.get("/orders/:userId", verify_token_1.verifyToken, showOrdersByUser);
    app.get("/orders/products/:id", verify_token_1.verifyToken, showProductsByOrderId);
    app.put('/orders/:id', verify_token_1.verifyToken, updateOrder);
    app.put('/orders/product/:id', verify_token_1.verifyToken, updateOrderProduct);
    app.delete('/orders/:id', verify_token_1.verifyToken, deleteOrder);
}
exports.default = order_routes;
