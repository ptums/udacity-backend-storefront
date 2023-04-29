// @ts-ignore
import client from "../database";

export type Product = {
  id?: number;
  price: number;
  category: string;
  name: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(`Could not get Product. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Product ${id}. Error: ${err}`);
    }
  }

  async create(b: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (price, category, name) VALUES($1, $2, $3)";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [b.price, b.category, b.name]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      console.error(err);
      throw new Error(`Could not add new Product ${b.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1) CASCADE";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
  async dropProductRecords(): Promise<void> {
    try {
      const sql = "TRUNCATE products CASCADE";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql);

      conn.release();
    } catch (err) {
      throw new Error(
        `Could not delete all records from products table. Error: ${err}`
      );
    }
  }
}
