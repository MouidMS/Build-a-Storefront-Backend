"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../../models/user");
const server_1 = __importDefault(require("../../server"));
const req = (0, supertest_1.default)(server_1.default);
const userStore = new user_1.UserStore();
describe('User Handler', () => {
    let userData = {
        firstname: 'mouid',
        lastname: 'moahmed',
        username: 'mouid_x1',
        password: '1212',
    };
    beforeAll(async () => {
        userData = await userStore.create(userData);
    });
    it('check if authentication working', async function () {
        const response = await req
            .post('/users/authenticate')
            .send({
            username: userData.username,
            password: '1212'
        });
        const { body } = response;
        exports.token = body;
        expect(response.status).toEqual(200);
    });
    it('check if authentication not working', async function () {
        const response = await req
            .post('/users/authenticate')
            .send({
            username: userData.username,
            password: '0000'
        });
        expect(response.status).toEqual(401);
    });
    it('get all users', async function () {
        const response = await req
            .get('/users/')
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('get one user', async function () {
        const response = await req
            .get('/users/3')
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.body.username).toEqual("mouid_x1");
        expect(response.body.id).toEqual(3);
    });
    it('create new user', async function () {
        const response = await req
            .post('/users/create')
            .send({
            firstname: 'fahad',
            lastname: 'ahmed',
            username: 'fahad_xd',
            password: '1234',
        });
        expect(response.status).toEqual(200);
    });
    it('update user', async function () {
        const response = await req
            .put('/users/3')
            .send({
            firstname: 'Fahad',
            lastname: 'Omar',
            username: 'fahad_oamr',
        })
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
    it('delete user', async function () {
        const response = await req
            .delete('/users/2')
            .set('Authorization', `Bearer ${exports.token}`);
        expect(response.status).toEqual(200);
    });
});
