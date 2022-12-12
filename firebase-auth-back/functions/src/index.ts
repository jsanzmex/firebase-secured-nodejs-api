import * as functions from 'firebase-functions';
import express from 'express';
import admin, { ServiceAccount } from 'firebase-admin';
import { initializeApp, getApps, getApp } from 'firebase/app';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import firebaseConfig from './firebase.config';
import serviceAccount from './cb-auth-tutorial-9b7d8-firebase-adminsdk-x6mr2-27b0948d6c.json';
import errorHandler from './middleware/error-handler';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

// This import needs to be below admin.initializeApp because otherwise, 
// Node can't detect a Firebase application and it throws an error
import authRoutes from './routes/auth';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/auth', authRoutes);

app.use(errorHandler);

exports.api = functions.https.onRequest(app);
