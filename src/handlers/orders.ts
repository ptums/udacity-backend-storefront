import express, { Request, Response } from 'express';
import { OrderStore } from '../models/orders';
import authMiddleware from '../utils/authentication-middleware';

const store = new OrderStore();

const orderStatus = async (req: Request, res: Response) => {
  const order = await store.userOrders(req.params.id, req.params.status);
  res.json(order);
};

const userOrders = async (req: Request, res: Response) => {
  const order = await store.userOrders(req.params.id, null);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  const order = await store.create(req.body);

  res.json(order);
};
const orderRoutes = (app: express.Application) => {
  app.get('/orders/:status/:id', authMiddleware, orderStatus);
  app.get('/orders/:id', authMiddleware, userOrders);
  app.post('/orders', create);
};

export default orderRoutes;
