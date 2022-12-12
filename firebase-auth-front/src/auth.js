import * as apiService from './api-service';
import { useLocation, Navigate } from 'react-router-dom';
import {
  useEffect,
  createContext,
  useContext,
} from 'react';
import {
  getAuth,
  signInWithCustomToken,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  useEffect(() => {}, [auth.loading]);

  return auth.loading ? undefined : auth.user ? (
    children
  ) : (
    <Navigate
      to="/signin"
      state={{ from: location }}
      replace
    />
  );
}

export const AuthContext = createContext(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const provider = new GoogleAuthProvider();

  const signIn = async ({ email, password }) => {
    const { token } = await apiService.signIn({
      email,
      password,
    });
    // console.log(token);
    await signInWithCustomToken(auth, token);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
  }

  const signUp = async ({
    email,
    password,
    secureNote,
  }) => {
    const { token } = await apiService.signUp({
      email,
      password,
      secureNote,
    });
    await signInWithCustomToken(getAuth(), token);
  };

  const signOut = async () => {
    const auth = getAuth();
    await firebaseSignOut(auth);
  };

  const value = { user, loading, signIn, signInWithGoogle, signOut, signUp };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
