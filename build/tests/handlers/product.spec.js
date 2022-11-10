"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database"));
const server_1 = __importDefault(require("../../server"));
const user_1 = require("../../models/user");
const req = (0, supertest_1.default)(server_1.default);
const userStore = new user_1.UserStore();
describe('Product Handler', () => {
    let userData = {
        firstname: 'mouid',
        lastname: 'moahmed',
        username: 'mouid_x1',
        password: '1212',
    };
    let productData = {
        name: "Iphone 14 pro max",
        price: 3800
    };
    beforeAll(async () => {
        await userStore.create(userData);
        const response = await req
            .post('/users/authenticate')
            .send({
            username: userData.username,
            password: userData.password
        });
        const { body } = response;
        exports.token = body;
    });
    afterAll(async () => {
        const connect = await database_1.default.connect();
        const sql3 = 'DELETE from orders';
        await connect.query(sql3);
        const sql2 = 'DELETE from products';
        await connect.query(sql2);
        const sql = 'DELETE from users';
        await connect.query(sql);
        connect.release();
    });
    it('create product', async function () {
        const response = await req
            .post('/products/create')
            .send({
            name: productData.name,
            price: productData.price
        })
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('index products', async function () {
        const response = await req
            .get('/products/');
        expect(response.status).toEqual(200);
    });
    it('show one product', async function () {
        const response = await req
            .get('/products/1')
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('update product', async function () {
        const response = await req
            .put('/products/1')
            .send({
            name: "iphone 13",
            price: 2900
        })
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('delete product', async function () {
        const response = await req
            .delete('/products/1')
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
});
