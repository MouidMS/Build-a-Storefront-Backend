import Client from '../database';
import bcrypt from 'bcrypt'
import hash from '../helpers/hash';


export type BaseUser= {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}
export interface User extends BaseUser {
  id: number;
}

export class UserStore {

  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql)
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can not get users. ${err}`);
    }
  }

/************* */
  async create(user: BaseUser): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      // @ts-ignore
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [user.firstname, user.lastname, user.username,hash(user.password as string)]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not add new user ${user.firstname} ${user.lastname}. ${err}`);
    }
  }

  async show(id_user: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=$1';
      const connection = await Client.connect();
      // @ts-ignore
      const result = await connection.query(sql, [id_user])
      connection.release();
      return result.rows[0]
    } catch (err) {
      throw new Error(`we can't not find the user ${id_user}. Error: ${err}`);
    }
  }
  async update( firstname: string,lastname:string,id: number): Promise<User> {
    try {
      const sql = 'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *';
      // @ts-ignore
      const connection = await Client.connect();
      const result = await connection.query(sql, [
       firstname,
        lastname,
        id,
      ]);
      connection.release();
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Could not update user ${firstname} ${lastname}. ${err}`
      );
    }
  }

  async delete(id_user: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM users WHERE id=$1';
      // @ts-ignore
      const connection = await Client.connect();
      const result = await connection.query(sql, [id_user])
      const user = result.rows[0]
      connection.release();

      return user;
    } catch (err) {
      throw new Error(`can't not delete user ${id_user}. ${err}`);
    }
  }
  
  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const sql = 'SELECT password FROM users WHERE username=$1';
    // @ts-ignore
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [username]);
      if (rows.length > 0) {
        const user = rows[0];
        if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Could not find user ${username}. ${err}`);
    } 
  }
}
