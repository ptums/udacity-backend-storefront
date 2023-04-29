import express, { Request, Response, Router } from "express";
import { ProductStore } from "../models/products";
import authMiddleware from "../utils/authentication-middleware";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.status(200).json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.status(200).json(product);
};

const create = async (req: Request, res: Response) => {
  const { price, category, name } = req.body;
  try {
    const newProduct = await store.create({
      price,
      category,
      name,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
};

export default productRoutes;
