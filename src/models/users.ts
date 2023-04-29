import bcrypt from "bcrypt";
import dotenv from "dotenv";

// @ts-ignore
import client from "../database";

dotenv.config();

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }

  async create(b: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3)";
      // @ts-ignore
      const conn = await client.connect();

      const hash = bcrypt.hashSync(
        b.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [b.firstName, b.lastName, hash]);

      const User = result.rows[0];

      conn.release();

      return User;
    } catch (err) {
      throw new Error(`Could not add new User ${b.firstName}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1) CASCADE";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
