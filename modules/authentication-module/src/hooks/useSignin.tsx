import { useState } from 'react';
import { Keyboard } from 'react-native';

import { useCoordinator } from '../components/onboarding-coordinator';
import { useBiometrics } from '../biometrics-provider/biometricsProvider';
import { useAuthBootstrap } from './useAuthBootstrap';

export const useSignIn = () => {
  const { isBiometricsLoading, isBiometricsEnabled, promptBiometrics } = useBiometrics();
  const [email, setEmail] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');
  const [appVersion, setAppVersion] = useState<string>('');
  const { setUserAuthorizedState, userEnrolled } = useAuthBootstrap();
  const { handleFooterButtonClicked } = useCoordinator();


  const signInWithBioMetrics = async () => {
    /**
     * SETUP BIOMETRICS LOGIN
     */
    try {
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const signInWithEmail = async () => {
    if (userEnrolled) {
      /**
       * TODO setup to listen to api response
       */
      setUserAuthorizedState(true);
    }
    handleFooterButtonClicked();
    Keyboard.dismiss();
  };

  const loading = isBiometricsLoading;
  return {
    signInWithEmail,
    signInWithBioMetrics,
    setEmail,
    promptBiometrics,
    setAppVersion,
    setPassword,
    password,
    appVersion,
    loading,
    isBiometricsEnabled,
    email,
  };
};
