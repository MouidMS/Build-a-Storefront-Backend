import Client from '../database';


export type OrderProduct = {
  quantity: number;
  order_id:number
  product_id: number;
}

export type BaseOrder = {
  user_id: number;
  status: boolean;
}

export interface Order extends BaseOrder {
  id?: number, 
}
export class OrderStore {

  async index(): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders'
      const connection = await Client.connect();
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=$1';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id]);
      const order = rows[0];
      const sql2 =
        'SELECT product_id, quantity FROM order_products WHERE order_id=$1';
      const { rows: productRows } = await connection.query(sql2, [id]);
      connection.release();
      return {
        ...order,
        product: productRows,
      };
    } catch (err) {
      throw new Error(`can not find order ${id}. ${err}`);
    }
  }

  
  async updateOrder(id: number, status: boolean): Promise<BaseOrder> {
    try {
      const sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [status, id]);
      const order = rows[0];
      connection.release();
          return order;

    } catch (err) {
      console.log(err)
      throw new Error(`Could not update order for user. ${err}`);
    }
  }

  async updateOrderProduct(quantity: number, order_id: number,product_id:number): Promise<BaseOrder> {
    try {
      const sql = 'UPDATE order_products SET quantity = $1 WHERE order_id = $2  AND product_id= $3 RETURNING *';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [quantity, order_id,product_id]);
      const order = rows[0];
      connection.release();
          return order;

    } catch (err) {
      console.log(err)
      throw new Error(`Could not update order_product. ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const orderProductsSql = 'DELETE FROM order_products WHERE order_id=($1)';
  
      // @ts-ignore
      const connection = await Client.connect();
      await connection.query(orderProductsSql, [id]);

      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      const order = result.rows[0]
      connection.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  
  async FindOrderByUser(id: string) {
    try {
        const sql = `SELECT * FROM orders WHERE user_id=($1)`
        const connection = await Client.connect();
        const result = await connection.query(sql, [id])
        const order = result.rows[0]
        connection.release()
        return order
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
}

async FindProductByOrderId(id: string) {

    const connection = await Client.connect();
    const sql = 'SELECT * FROM order_products WHERE order_id=($1) '
    const result = await connection.query(sql,[id])
    const product = result.rows[0]
    connection.release()
    return product
    
}

async create(o: Order): Promise<Order> {
    try {
        const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *'
        // @ts-ignore
        const connection = await Client.connect();
        const result = await connection.query(sql, [o.user_id, o.status])
        const order = result.rows[0]
        connection.release()
        return order
    } catch (err) {
        throw new Error(`Could not add new order. Error: ${err}`)
    }
}

async addProductInOrder(add: OrderProduct): Promise <OrderProduct> {
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id ) VALUES ($1, $2, $3) RETURNING *'
       const connection = await Client.connect();
       const result = await connection.query(sql, [add.quantity, add.order_id, add.product_id])
       const product = result.rows[0]
       connection.release()
       return product

      } catch (err) {
        throw new Error(`OrderProduct model not working. Error: ${err}`)
   }
}
}