import React from 'react';
import { useAuth, useProvideAuth } from '../hooks/useAuth';
import { AuthContext } from './authContext';

export interface AuthProps {
  children: React.ReactNode;
  clearCache?: () => void;
}
export function AuthProvider(props: AuthProps) {
  const { children, clearCache } = props;
  const auth = useProvideAuth(clearCache);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { useAuth };
