import {
  getAuth as getClientAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getAuth as getAdminAuth,
} from 'firebase-admin/auth';
import { firestore } from 'firebase-admin';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error';
import { UserParams } from '../utils/user-fields';

interface LoginBody {
  email: string,
  password: string,
}
interface RegisterBody {
  email: string,
  password: string,
  secureNote: string,
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as LoginBody;
  try {
    const credential = await signInWithEmailAndPassword(
      getClientAuth(),
      email,
      password
    );
    const token = await getAdminAuth().createCustomToken(
      credential.user.uid
    );
    res.status(200).json({ token });
  } catch (err) {
    const { code } = err as CustomError;
    if (
      code === 'auth/wrong-password' ||
      code === 'auth/user-not-found'
    ) {
      const error = new CustomError('Check your credentials', 403);
      error.code = code.replace('auth/', '');
      next(error);
    }
    next(err);
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError('Entered data is incorrect', 422);
      error.data = errors.array();
      throw error;
    }
    const { email, password, secureNote } = req.body as RegisterBody;

    const auth = getClientAuth();
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const adminAuth = getAdminAuth();
    const token = await adminAuth.createCustomToken(
      credential.user.uid
    );
    await firestore()
      .doc(`users/${credential.user.uid}`)
      .set({ secureNote });
    res.status(201).json({ token });
  } catch (err) {
    const { code } = err as CustomError;
    if (code === 'auth/email-already-in-use') {
      const error = new CustomError('Email already in use', 400);
      error.code = code.replace('auth/', '');
      next(error);
    }
    next(err);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const params = req.params as UserParams;
  const userId = params.id;
  if (!userId) {
    const error = new CustomError('No user id provided', 400);
    next(error);
    return;
  }

  if (userId !== req.token.uid) {
    const error = new CustomError('Unauthorized', 403);
    next(error);
    return;
  }

  const snapshot = await firestore()
    .collection('users')
    .doc(userId)
    .get();
  if (!snapshot.exists) {
    const error = new CustomError('User not found', 404);
    error.code = 'user-not-found';
    next(error);
    return;
  }
  const user = snapshot.data();

  res.status(200).json({ secureNote: user!.secureNote });
}