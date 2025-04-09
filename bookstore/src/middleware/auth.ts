import { Request, Response, NextFunction } from 'express';
import basicAuth from 'basic-auth';

const users = {
  admin: 'password'
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = basicAuth(req);
  if (!user || users[user.name] !== user.pass) {
    res.status(401).json({ message: 'Unauthorized access' });
    return;
  }
  next();
}
