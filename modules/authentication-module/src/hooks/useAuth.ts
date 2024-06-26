import { useContext, useEffect, useState } from 'react';
// import Auth from '../auth-providers/firebase/auth-service';
import { AuthContext, AuthContextShape } from '../provider/authContext';

export type UseAuth = () => AuthContextShape;
/**
 *
 */
export const useAuth: UseAuth = (): AuthContextShape => useContext(AuthContext);
export const useProvideAuth = (clearCache: any): AuthContextShape => {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setUser] = useState(null);
  const [phoneVerified, setVerified] = useState(false);

  const authStateChanged = (user: any) => {
    setUser(user);

    if (initializing) setInitializing(false);
  };

  const setPhoneVerified = (verified: boolean) => {
    setVerified(verified);
    return verified;
  };

  useEffect(() => {
    // const subscriber = Auth.onAuthStateChanged(authStateChanged);
    // return subscriber;
  }, []);

  return {
    userInfo: currentUser,
    initializing,
    // currentUser,
    // authService: Auth,
    setPhoneVerified,
    phoneVerified,
    clearCache,
  };
};
