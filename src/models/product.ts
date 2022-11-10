import Client from '../database';

export type BaseProduct ={
  name: string;
  price: number;
}
export interface Product extends BaseProduct {
  id: number;
}
export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';
      // @ts-ignore
      const connection = await Client.connect();
      const result = await connection.query(sql)
      connection.release();
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async create(p: BaseProduct): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();
            // @ts-ignore
      const { rows } = await conn.query(sql, [p.name,p.price]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. ${err}`);
    }
  }

  async show(id_product: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
          // @ts-ignore
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id_product]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id_product}. ${err}`);
    }
  }

  
  async update(id: number, p: BaseProduct): Promise<Product> {
    const { name: name, price } = p;
    try {
      const sql =
        'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [name, price, id]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${name}. ${err}`);
    }
  }

  async delete(id_product: number): Promise<Product> {
    try {
      const connection = await Client.connect();
          // @ts-ignore
      const sql = 'DELETE FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id_product]);
      const user = result.rows[0]
      connection.release();
      return user

    } catch (err) {
      throw new Error(`Could not delete product ${id_product}. Error: ${err}`);
    }
  }
}