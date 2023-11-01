import { verify, sign } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import UserModel from '../../database/models/SequelizeUsers';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  username: string,
};

function generateToken(payload: TokenPayload): string {
  const token = sign(payload, secret, {
    expiresIn: '1d',
  });
  return token;
}

function decodedToken(token: string): TokenPayload {
  const data = verify(token, secret) as TokenPayload;
  return data;
}

async function authMiddleware(
  req: Request & { userId?: number },
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { username, id } = await decodedToken(token);
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Token must be a valid token' });
    req.userId = id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export {
  generateToken,
  authMiddleware,
};
