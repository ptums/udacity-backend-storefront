// @ts-ignore
import client from "../database";

export type Order = {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Order ${id}. Error: ${err}`);
    }
  }

  async current(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Order ${id}. Error: ${err}`);
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (product_id, quantity, user_id) VALUES($1, $2, $3)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [
        b.product_id,
        b.quantity,
        b.user_id,
      ]);

      const Order = result.rows[0];

      conn.release();

      return Order;
    } catch (err) {
      throw new Error(`Could not add new Order ${b.product_id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
