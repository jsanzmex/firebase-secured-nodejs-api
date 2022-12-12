import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import SignIn from './routes/SignIn';
import { AuthProvider } from './auth';
import { initializeApp } from 'firebase/app';
// import firebaseConfig from './firebase.config';
import SignUp from './routes/SignUp';

const firebaseConfig = {
  apiKey: "AIzaSyBgWIdvU-Easbfby29jPInuWwvCIfCjgS0",
  authDomain: "cb-auth-tutorial-9b7d8.firebaseapp.com",
  projectId: "cb-auth-tutorial-9b7d8",
  storageBucket: "cb-auth-tutorial-9b7d8.appspot.com",
  messagingSenderId: "1025157124297",
  appId: "1:1025157124297:web:7273e36361b860e1fafd18"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
