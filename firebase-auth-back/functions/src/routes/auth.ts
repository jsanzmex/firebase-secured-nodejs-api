import { Router } from 'express';
import { body } from 'express-validator';
import { login, register, getUser } from '../controllers/auth';
import firebaseAuth from '../middleware/firebase-auth';

const router = Router();

router.post('/login',
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail(),
  body('password')
    .trim()
    .not()
    .isEmpty(),
  login);

router.post('/register',
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    // .custom((value, { req }) => {
    //   return User.findOne({ email: value }).then(userDoc => {
    //     if (userDoc) {
    //       return Promise.reject('E-Mail address already exists!');
    //     }
    //   });
    // })
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 }),
  body('secureNote')
    .trim()
    .not()
    .isEmpty(),
  register);

router.get('/users/:id', firebaseAuth, getUser);

export default router;