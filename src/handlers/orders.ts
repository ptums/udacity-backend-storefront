import express, { Request, Response } from "express";
import { OrderStore } from "../models/orders";
import authMiddleware from "../utils/authentication-middleware";

const store = new OrderStore();

const active = async (req: Request, res: Response) => {
  const order = await store.userOrders(req.params.id, "active");
  res.json(order);
};

const complete = async (req: Request, res: Response) => {
  const order = await store.userOrders(req.params.id, "complete");
  res.json(order);
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders/complete/:id", authMiddleware, complete);
  app.get("/orders/active/:id", authMiddleware, active);
};

export default orderRoutes;
