import { getAuth } from 'firebase-admin/auth';
import { CustomError } from '../utils/custom-error';
import { Request, Response, NextFunction } from 'express';

async function firebaseAuth(req: Request, res: Response, next: NextFunction) {
  const regex = /Bearer (.+)/i;
  try {
    const idToken = req.headers['authorization']?.match(regex)?.[1] as string;
    req.token = await getAuth().verifyIdToken(idToken);
    next();
  } catch (err) {
    const error = new CustomError('Unauthenticated', 401);
    next(error);
  }
}

export default firebaseAuth;
