import express, { Request, Response } from "express";
import { OrderStore } from "../models/orders";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  const { product_id, quantity, user_id, status } = req.body;
  try {
    const newOrder = await store.create({
      product_id,
      quantity,
      user_id,
      status,
    });
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
};

export default orderRoutes;
