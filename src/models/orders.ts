// @ts-ignore
import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  quantity: number;
  status: string;
};

export type OrderProduct = {
  id?: number;
  order_id?: number;
  product_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    // @ts-ignore
    const conn = await client.connect();

    try {
      const sql = 'SELECT o.*, op.product_id, op.quantity FROM Orders o JOIN order_product op ON o.id = op.order_id';
      const result = await conn.query(sql);

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    } finally {
      conn.release();
    }
  }

  async show(id: string): Promise<Order> {
    // @ts-ignore
    const conn = await client.connect();

    try {
      const sql =
        'SELECT o.id, o.quantity, o.status FROM Orders o JOIN order_product op ON o.id = op.order_id WHERE o.user_id = ($1)';
      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Order ${id}. Error: ${err}`);
    } finally {
      conn.release();
    }
  }

  async userOrders(id: string, status: string | null): Promise<Order[]> {
    // @ts-ignore
    const conn = await client.connect();

    try {
      let sql: string;
      let params: string[];

      if (status) {
        sql =
          'SELECT o.id, o.quantity, o.status FROM Orders o JOIN order_product op ON o.id = op.order_id WHERE o.user_id = ($1) AND o.status = ($2)';
        params = [id, status];
      } else {
        sql =
          'SELECT o.id, o.quantity, o.status FROM Orders o JOIN order_product op ON o.id = op.order_id WHERE o.user_id = ($1)';
        params = [id];
      }

      const result = await conn.query(sql, params);

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find Order ${id}. Error: ${err}`);
    } finally {
      conn.release();
    }
  }

  async create(b: Order & OrderProduct): Promise<OrderProduct | Order> {
    // @ts-ignore
    const conn = await client.connect();

    try {
      // First create an order in 'orders' table
      const sql = 'INSERT INTO orders (user_id, quantity, status) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [b.user_id, b.quantity, b.status]);
      const order = result.rows[0];

      if (order) {
        // Then create add product details with order.id in 'order_product's
        const sql = 'INSERT INTO order_product (order_id, product_id) VALUES($1, $2) RETURNING *';
        const result = await conn.query(sql, [order.id, b.product_id]);
        const productOrder = result.rows[0];

        return productOrder;
      }

      return order;
    } catch (err) {
      throw new Error(`Could not add new Order ${b.product_id}. Error: ${err}`);
    } finally {
      conn.release();
    }
  }

  async delete(id: string): Promise<Order | OrderProduct> {
    // @ts-ignore
    const conn = await client.connect();

    try {
      // first delete product_order based on order_id
      const sqlProductOrders = 'DELETE FROM order_product WHERE order_id=($1)';
      const resultProductOrders = await conn.query(sqlProductOrders, [id]);

      if (resultProductOrders) {
        // then do the filing
        const sqlOrders = 'DELETE FROM orders WHERE id=($1)';

        const resultOrders = await conn.query(sqlOrders, [id]);

        return resultOrders;
      }

      return resultProductOrders;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    } finally {
      conn.release();
    }
  }

  async dropOrderRecords(): Promise<void> {
    try {
      const sql = 'TRUNCATE orders CASCADE';
      // @ts-ignore
      const conn = await client.connect();
      await conn.query(sql);

      conn.release();
    } catch (err) {
      throw new Error(`Could not delete all records from orders table. Error: ${err}`);
    }
  }
}
