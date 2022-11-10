"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const user_1 = require("../../models/user");
const server_2 = __importDefault(require("../../server"));
const req = (0, supertest_1.default)(server_1.default);
const userStore = new user_1.UserStore();
describe('Order Handler', () => {
    let userData = {
        firstname: 'mouid',
        lastname: 'moahmed',
        username: 'mouid_x1',
        password: '1212',
    };
    let orderData = {
        user_id: 1,
        status: true
    };
    let orderProductData = {
        quantity: 5,
        order_id: 1,
        product_id: 1
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
        await req
            .post('/products/create')
            .send({
            name: 'iphone x',
            price: 2000
        })
            .set('Authorization', `Bearer ${exports.token}`);
    });
    it('create order', async function () {
        const response = await req
            .post('/orders/create')
            .send({
            userId: orderData.user_id,
            status: orderData.status
        })
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('index orders', async function () {
        const response = await req
            .get('/orders/')
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('add product to order', async function () {
        const response = await (0, supertest_1.default)(server_2.default).post("/orders/products/").send({
            quantity: orderProductData.quantity,
            orderid: orderProductData.order_id,
            productid: orderProductData.product_id
        })
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('show orders By user', async function () {
        const response = await req
            .get('/orders/1')
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('update order by id', async function () {
        const response = await req
            .put('/orders/3')
            .send({ status: "false" })
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('update orderProduct by id', async function () {
        const response = await req
            .put('/orders/product/3')
            .send({
            quantity: 10,
            product_id: 2
        })
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('delete order', async function () {
        const response = await req
            .delete('/orders/1')
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
});
