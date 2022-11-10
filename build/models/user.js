"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash_1 = __importDefault(require("../helpers/hash"));
class UserStore {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can not get users. ${err}`);
        }
    }
    /************* */
    async create(user) {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *';
            // @ts-ignore
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql, [user.firstname, user.lastname, user.username, (0, hash_1.default)(user.password)]);
            connection.release();
            return rows[0];
        }
        catch (err) {
            throw new Error(`Could not add new user ${user.firstname} ${user.lastname}. ${err}`);
        }
    }
    async show(id_user) {
        try {
            const sql = 'SELECT * FROM users WHERE id=$1';
            const connection = await database_1.default.connect();
            // @ts-ignore
            const result = await connection.query(sql, [id_user]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`we can't not find the user ${id_user}. Error: ${err}`);
        }
    }
    async update(firstname, lastname, id) {
        try {
            const sql = 'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *';
            // @ts-ignore
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [
                firstname,
                lastname,
                id,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update user ${firstname} ${lastname}. ${err}`);
        }
    }
    async delete(id_user) {
        try {
            const sql = 'DELETE FROM users WHERE id=$1';
            // @ts-ignore
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id_user]);
            const user = result.rows[0];
            connection.release();
            return user;
        }
        catch (err) {
            throw new Error(`can't not delete user ${id_user}. ${err}`);
        }
    }
    async authenticate(username, password) {
        try {
            const sql = 'SELECT password FROM users WHERE username=$1';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const { rows } = await conn.query(sql, [username]);
            if (rows.length > 0) {
                const user = rows[0];
                if (bcrypt_1.default.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
                    return user;
                }
            }
            conn.release();
            return null;
        }
        catch (err) {
            throw new Error(`Could not find user ${username}. ${err}`);
        }
    }
}
exports.UserStore = UserStore;
