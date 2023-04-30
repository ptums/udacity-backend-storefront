import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, UserStore } from '../models/users';
import authMiddleware from '../utils/authentication-middleware';

const pepper = process.env.BCRYPT_PASSWORD;
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
  const tokenSecret = process.env.TOKEN_SECRET as string;

  try {
    const newUser = await store.create({
      firstName,
      lastName,
      password,
    });

    if (newUser) {
      const token = jwt.sign(newUser.password, tokenSecret);
      res.status(201).json(token);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;
  const tokenSecret = process.env.TOKEN_SECRET as string;
  const user: User = await store.findUser(firstName, lastName);

  if (user) {
    const match = await bcrypt.compare(password + pepper, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, tokenSecret, {
      expiresIn: '1h',
    });
    res.json({ token });
  }

  if (!user) {
    return res.status(401).json({ error: 'Cannot find user' });
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', authMiddleware, index);
  app.get('/users/:id', authMiddleware, show);
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
};

export default userRoutes;
