"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../helpers/token");
const verify_token_1 = require("../helpers/verify_token");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userStore = new user_1.UserStore();
const index = async (req, res) => {
    try {
        const users = await userStore.index();
        res.json(users);
    }
    catch (err) {
        throw new Error(`Could not get users. Error: ${err}`);
    }
};
const create = async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await userStore.create({
            firstname,
            lastname,
            username,
            password,
        });
        const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN);
        res.json({
            user, token
        });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userStore.show(id);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const user = await userStore.update(firstname, lastname, id);
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await userStore.delete(id);
        res.send(`User with id ${id} successfully deleted.`);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const authenticate = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const u = await userStore.authenticate(username, password);
        if (!u) {
            return res.status(401).send(`Wrong password.`);
        }
        res.json((0, token_1.getTokenByUser)(u));
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
function user_routes(app) {
    app.get('/users', verify_token_1.verifyToken, index);
    app.post('/users/create', create);
    app.get('/users/:id', verify_token_1.verifyToken, show);
    app.put('/users/:id', verify_token_1.verifyToken, update);
    app.delete('/users/:id', verify_token_1.verifyToken, deleteUser);
    app.post('/users/authenticate', authenticate);
}
exports.default = user_routes;
