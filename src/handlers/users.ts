import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserStore } from "../models/users";
import authMiddleware from "../utils/authentication-middleware";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.status(200).json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.status(200).json(user);
};

const create = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;
  try {
    const newUser = await store.create({
      firstName,
      lastName,
      password,
    });

    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );

    res.status(201).json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;
  // Left off
  const authUser = await store.create({
    firstName,
    lastName,
    password,
  });
};

const userRoutes = (app: express.Application) => {
  app.get("/users", authMiddleware, index);
  app.get("/users/:id", authMiddleware, show);
  app.post("/users", authMiddleware, create);
  app.post("/authenticate", authenticate);
};

export default userRoutes;
