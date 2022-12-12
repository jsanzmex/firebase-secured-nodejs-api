import axios from 'axios';
import { CLOUD_FUNCTIONS_ORIGIN } from './functions-origin';

const apiUrl = `http://localhost:5001/cb-auth-tutorial-9b7d8/us-central1/api`;

export async function signIn({ email, password }) {
  const url = `${apiUrl}/auth/login`;
  const res = await axios.post(url, { email, password });
  return res.data;
}

export async function signUp({
  email,
  password,
  secureNote,
}) {
  const url = `${apiUrl}/auth/register`;
  const res = await axios.post(url, {
    email,
    password,
    secureNote,
  });
  return res.data;
}

export async function getUserData({ userIdToken, userId }) {
  const url = `${apiUrl}/auth/users/${userId}`;
  console.log(`userIdToken: ${userIdToken}`);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  return res.data;
}
