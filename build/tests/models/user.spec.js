"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const database_1 = __importDefault(require("../../database"));
const userStore = new user_1.UserStore();
describe('Test User Model', () => {
    const testUser = {
        username: 'mouid_x1',
        firstname: 'mouid',
        lastname: 'mohamed',
        password: '1212',
    };
    afterAll(async () => {
        const connect = await database_1.default.connect();
        const sql = 'DELETE from users';
        await connect.query(sql);
        connect.release();
    });
    it('index method', () => {
        expect(userStore.index).toBeDefined();
    });
    it('show method', () => {
        expect(userStore.show).toBeDefined();
    });
    it('create method', () => {
        expect(userStore.create).toBeDefined();
    });
    it('remove method', () => {
        expect(userStore.delete).toBeDefined();
    });
    it('update method', () => {
        expect(userStore.update).toBeDefined();
    });
    it('authenticate method', () => {
        expect(userStore.authenticate).toBeDefined();
    });
    it('check if can create new user', async () => {
        const ck = await userStore.create(testUser);
        const { id, username, firstname, lastname } = ck;
        if (ck) {
            expect(username).toBe(testUser.username);
            expect(firstname).toBe(testUser.firstname);
            expect(lastname).toBe(testUser.lastname);
        }
    });
    it('check if can return index users', async () => {
        const result = await userStore.index();
        expect(result[0].id).toBe(6);
        expect(result[0].username).toEqual("mouid_x1");
        expect(result[0].firstname).toEqual("mouid");
        expect(result[0].lastname).toEqual("mohamed");
    });
    it('check if have correct users', async () => {
        const ck = await userStore.create(testUser);
        const users = await userStore.show(ck.id);
        expect(users).toEqual(ck);
        await userStore.delete(ck.id);
    });
    it('check if can delete user', async () => {
        const ck = await userStore.create(testUser);
        const { firstname, lastname } = ck;
        await userStore.delete(ck.id);
        expect(firstname).toEqual('mouid');
        expect(lastname).toEqual('mohamed');
    });
    it('check if can update user', async () => {
        const ck = await userStore.create(testUser);
        const updateUser = {
            firstname: 'walled',
            lastname: 'kahild',
        };
        const { firstname, lastname } = await userStore.update(updateUser.firstname, updateUser.lastname, ck.id);
        expect(firstname).toEqual(updateUser.firstname);
        expect(lastname).toEqual(updateUser.lastname);
        await userStore.delete(ck.id);
    });
});
