import React, { createContext, useState, useEffect, FC, useContext } from 'react';
import Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IBiometricsContext {
  isBiometricsSupported: boolean;
  isBiometricsEnabled: boolean;
  isBiometricsLoading: boolean;
  biometricsType: Keychain.BIOMETRY_TYPE | null;
  enableBiometrics: (username: string, password: string) => Promise<void>;
  disableBiometrics: () => Promise<void>;
  promptBiometrics: () => Promise<false | Keychain.UserCredentials>;
}

const BiometricsContext = createContext<IBiometricsContext>({
  isBiometricsSupported: false,
  isBiometricsEnabled: false,
  isBiometricsLoading: true,
  biometricsType: null,
  enableBiometrics: async () => undefined,
  disableBiometrics: async () => undefined,
  // @ts-ignore
  promptBiometrics: () => {},
});
interface BiometricsProps {
  children: React.ReactNode;
}
export const BiometricsProvider: FC<BiometricsProps> = ({ children }) => {
  const [isBiometricsSupported, setBiometricsSupported] = useState(false);
  const [biometricsType, setBiometricsType] = useState<Keychain.BIOMETRY_TYPE | null>(null);
  const [isBiometricsEnabled, setBiometricsEnabled] = useState(false);
  const [isBiometricsLoading, setBiometricsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const type = await Keychain.getSupportedBiometryType();

      if (!type) {
        setBiometricsLoading(false);
        return;
      }

      setBiometricsSupported(true);
      setBiometricsType(type);
      setBiometricsEnabled((await AsyncStorage.getItem('is-biometrics-enabled')) === 'true');
      setBiometricsLoading(false);
    };
    init();
  }, []);

  const enableBiometrics = async (username: string, password: string) => {
    setBiometricsLoading(true);
    try {
      await Keychain.setGenericPassword(username, password, {
        service: 'com.bswift.bswift',
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
      });

      await AsyncStorage.setItem('is-biometrics-enabled', 'true');
      setBiometricsEnabled(true);
      setBiometricsLoading(false);
    } catch (error) {
      setBiometricsLoading(false);
      throw error;
    }
  };

  const disableBiometrics = async () => {
    try {
      await Keychain.resetGenericPassword({
        service: 'com.bswift.bswift',
      });
      await AsyncStorage.setItem('is-biometrics-enabled', 'false');
      setBiometricsEnabled(false);
    } catch (error) {
      setBiometricsLoading(false);
      throw error;
    }
  };

  const promptBiometrics = async () => {
    return Keychain.getGenericPassword({
      service: 'com.bswift.bswift',
    });
  };

  return (
    <BiometricsContext.Provider
      value={{
        isBiometricsSupported,
        isBiometricsEnabled,
        isBiometricsLoading,
        biometricsType,
        enableBiometrics,
        disableBiometrics,
        promptBiometrics,
      }}
    >
      {children}
    </BiometricsContext.Provider>
  );
};

export const useBiometrics = () => {
  return useContext(BiometricsContext);
};
