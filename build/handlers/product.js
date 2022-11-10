"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const verify_token_1 = require("../helpers/verify_token");
const productStore = new product_1.ProductStore();
const index = async (req, res) => {
    try {
        const products = await productStore.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const create = async (req, res) => {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const product = await productStore.create({ name, price });
        res.json({
            product,
        });
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productStore.show(id);
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const name = req.body.name;
        const price = req.body.price;
        const product = await productStore.update(id, {
            name,
            price,
        });
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await productStore.delete(id);
        res.send(`successfully Delete`);
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
function product_routes(app) {
    app.get('/products', index);
    app.post('/products/create', verify_token_1.verifyToken, create);
    app.get('/products/:id', verify_token_1.verifyToken, show);
    app.put('/products/:id', verify_token_1.verifyToken, update);
    app.delete('/products/:id', verify_token_1.verifyToken, deleteProduct);
}
exports.default = product_routes;
