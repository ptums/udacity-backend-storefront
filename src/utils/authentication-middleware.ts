import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface DecodedToken {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      userData?: DecodedToken;
    }
  }
}

const checkAuth: RequestHandler<Record<string, any>, any, any, Record<string, any>> = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return (res as Response).status(401).json({ message: 'Authorization header missing' });
    }
    const authHeaderArray = authHeader.split(' ');
    if (authHeaderArray[0] !== 'Bearer' || !authHeaderArray[1]) {
      return res.status(401).json({ message: 'Authorization header incorrect format' });
    }
    const decodedToken = jwt.verify(authHeaderArray[1], process.env.TOKEN_SECRET as string) as JwtPayload &
      DecodedToken;
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authorization failed', error });
  }
};

export default checkAuth;
