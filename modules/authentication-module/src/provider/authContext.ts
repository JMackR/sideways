import { createContext } from 'react';
// import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type User = {
  uid: string;
  id: string;
  phoneNumber: string;
  getIdTokenResult: () => Promise<Object>;
};
export type UserInfo = {
  name: string;
  photo_url: string;
  getStreamClientToken: string;
};
export type AuthContextShape = {
  userInfo: UserInfo | null;
  // currentUser?: FirebaseAuthTypes.User | null;
  initializing: boolean;
  // authService: AuthServiceModuleShape | null;
  phoneVerified: boolean;
  setPhoneVerified: (verified: boolean) => boolean;
  clearCache: () => void;
};

const auth: AuthContextShape = {
  userInfo: null,
  // currentUser: null,
  initializing: true,
  authService: null,
  phoneVerified: false,
  setPhoneVerified: (verified: boolean) => verified,
  clearCache: () => {},
};

export const AuthContext = createContext<AuthContextShape>(auth);
