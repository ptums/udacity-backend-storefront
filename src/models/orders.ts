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
    // @ts-ignore
    const conn = await client.connect();

    try {
      const sql = "SELECT * FROM orders";
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
      const sql = "SELECT * FROM orders WHERE id=($1)";
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
        sql = "SELECT * FROM orders WHERE user_id=($1) AND status=($2)";
        params = [id, status];
      } else {
        sql = "SELECT * FROM orders WHERE user_id=($1)";
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

  async create(b: Order): Promise<Order> {
    // @ts-ignore
    const conn = await client.connect();

    try {
      const sql =
        "INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *";

      const result = await conn.query(sql, [
        b.product_id,
        b.quantity,
        b.user_id,
        b.status,
      ]);

      const order = result.rows[0];

      return order;
    } catch (err) {
      throw new Error(`Could not add new Order ${b.product_id}. Error: ${err}`);
    } finally {
      conn.release();
    }
  }

  async delete(id: string): Promise<Order> {
    // @ts-ignore
    const conn = await client.connect();

    try {
      const sql = "DELETE FROM orders WHERE id=($1)";

      const result = await conn.query(sql, [id]);

      return result;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    } finally {
      conn.release();
    }
  }

  async dropOrderRecords(): Promise<void> {
    try {
      const sql = "TRUNCATE orders CASCADE";
      // @ts-ignore
      const conn = await client.connect();
      await conn.query(sql);

      conn.release();
    } catch (err) {
      throw new Error(
        `Could not delete all records from orders table. Error: ${err}`
      );
    }
  }
}
