import { RootState } from '@upward/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useBiometrics } from '../biometrics-provider/biometricsProvider';
// import { useAuth } from './useAuth';

type AuthBootstrapTypes = {
  userEnrolled: boolean;
  userPhoneVerified: boolean;
  userBiometricsEnabled: boolean;
  userAuthorized: boolean;
  initializing: boolean;
  setUserEnrollment: (boolean: boolean) => void;
  setPhoneVerified: (boolean: boolean) => void;
  setUserAuthorizedState: (boolean: boolean) => void;
  setBiometricsEnable: (boolean: boolean) => void;
  setNotificationsEnable: (boolean: boolean) => void;
};
const autBootstrap: AuthBootstrapTypes = {
  userEnrolled: false,
  userPhoneVerified: false,
  userBiometricsEnabled: false,
  userAuthorized: false,
  initializing: false,
  setUserEnrollment: () => { },
  setPhoneVerified: () => { },
  setUserAuthorizedState: () => { },
  setBiometricsEnable: () => { },
  setNotificationsEnable: () => { },
};
const AuthBootStrapContext = createContext<AuthBootstrapTypes>(autBootstrap);

export const useAuthBootstrap = () => {
  const context = useContext(AuthBootStrapContext);
  if (!context) {
    throw new Error('This components context is not available');
  }
  return context;
};
const useAuthBootstrapProvider = () => {
  const isForcedLogout = useSelector((state: RootState) => state.auth.forcedLogout);
  const [userEnrolled, setUserEnrolled] = useState(false);
  const [userPhoneVerified, setUserPhoneVerified] = useState(false);
  const [userBiometricsEnabled, setUserBiometricsEnable] = useState(false);
  const [userAuthorized, setUserAuthorized] = useState(false);
  const [userNotificationsEnabled, setUserNotificationsEnabled] = useState(false);
  const [initializing, setInitializing] = useState(true);
  // const { authService, currentUser, initializing: firebaseInitialize } = useAuth();

  const biometrics = useBiometrics();

  const setUserEnrollment = async (enrolled: boolean) => {
    await AsyncStorage.setItem('enrolled', JSON.stringify(enrolled));
    setUserEnrolled(enrolled);
  };
  const setPhoneVerified = async (verifed: boolean) => {
    await AsyncStorage.setItem('phoneVerified', JSON.stringify(verifed));
    setUserPhoneVerified(verifed);
  };
  const setUserAuthorizedState = async (signedIn: boolean) => {
    await AsyncStorage.setItem('userAuthorized', JSON.stringify(signedIn));
    setUserAuthorized(signedIn);
  };
  const setBiometricsEnable = async (isEnabled: boolean) => {
    setUserBiometricsEnable(isEnabled);
  };
  const setNotificationsEnable = async (isEnabled: boolean) => {
    await AsyncStorage.setItem('notificationsIsEnabled', JSON.stringify(isEnabled));
    setUserNotificationsEnabled(isEnabled);
  };

  useEffect(() => {
    /**
     * Dev purposes only to clear everything
     */
    const clearAuthState = async () => {
      await AsyncStorage.multiRemove(['enrolled', 'phoneVerified', 'userAuthorized']);
      setInitializing(false);
    };

    const createAuthState = async () => {
      try {
        const enrolled = await AsyncStorage.getItem('enrolled');
        const phoneVerified = await AsyncStorage.getItem('phoneVerified');
        const notificationsEnabled = await AsyncStorage.getItem('notificationsIsEnabled');
        const userAuthorized = await AsyncStorage.getItem('userAuthorized');
        const biometricsEnabled = biometrics.isBiometricsEnabled;

        if (enrolled) {
          setUserEnrolled(true);
        }
        if (phoneVerified) {
          setUserPhoneVerified(true);
        }
        if (biometricsEnabled) {
          setUserBiometricsEnable(true);
        }
        if (userAuthorized) {
          setUserAuthorized(true);
        }

        if (notificationsEnabled) {
          setUserNotificationsEnabled(true);
        }

        setInitializing(false);
      } catch (e) {
        setInitializing(false);
      }
    };
    if (!userAuthorized) {
      createAuthState();
    }

    // clearAuthState()
  }, []);

  /**
   * Clears authentication tokens and signs the user out for reauthentication
   */
  // useEffect(() => {
  //   if (isForcedLogout && !__DEV__) {
  //     async function logOutUser() {
  //       authService
  //         ?.logout()
  //         .then(() => {
  //           setUserAuthorized(false);
  //         })
  //         .catch((error) => {
  //           throw error;
  //         });
  //     }

  //     logOutUser();
  //   }
  // }, [isForcedLogout]);

  return {
    userEnrolled,
    userPhoneVerified,
    userBiometricsEnabled,
    userAuthorized,
    userNotificationsEnabled,
    initializing,
    setUserEnrollment,
    setPhoneVerified,
    setNotificationsEnable,
    setUserAuthorizedState,
    setBiometricsEnable,
  };
};
interface BoostrapProps {
  children: React.ReactNode;
}
export const AuthBootstrapProvider = (props: BoostrapProps) => {
  const { children } = props;
  const authBootStrap = useAuthBootstrapProvider();

  return <AuthBootStrapContext.Provider value={authBootStrap}>{children}</AuthBootStrapContext.Provider>;
};
