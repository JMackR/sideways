import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import { ChevronLeftIcon, } from '@upward/assets';
import { FlexibleRow, NavigationBar, NavigationBarProps, Screen } from '@upward/core-ui-widgets';
import {
  useAuth,
  useAuthBootstrap,
  useBiometrics,
} from '@upward/authentication';
import { useColorForBackgroundColor, useColorTheme } from '@upward/themes';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NavigableRoute } from '@upward/navigation';

export const ManageBiometrics = () => {
  const themeBackground = {
    backgroundColor: useColorForBackgroundColor('onBackground'),
  };
  const { t } = useTranslation();
  const theme = useColorTheme();

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const biometrics = useBiometrics();

  const { setBiometricsEnable } = useAuthBootstrap();
  const navigation = useNavigation<any>();


  useEffect(() => {
    if (biometrics.isBiometricsEnabled) {
      setIsSwitchOn(biometrics.isBiometricsEnabled);
    }
  }, [biometrics]);

  const checkBioMetrics = async () => {
    try {
      if (biometrics.isBiometricsSupported) {
        await biometrics.promptBiometrics();

        const deviceID = await getUniqueId();
        const token = await AsyncStorage.getItem('@AntiForgeryToken');

        setBiometricsEnable(true);
      } else if (!biometrics.isBiometricsSupported) {


      }
    } catch (error) {

    }
  };

  const onToggleSwitch = () => {
    if (!biometrics.isBiometricsEnabled) {
      setIsSwitchOn(true);

      checkBioMetrics();
    } else {
      setIsSwitchOn(false);

      biometrics.disableBiometrics();
    }
  };

  useEffect(() => {
    const setDeviceId = async () => {

    };
    setDeviceId();

  }, []);
  const navigationBarProps: NavigationBarProps = {
    testID: 'ENABLE_BIOMETRIC',
    showCurve: false,
    title: t('onboard.ENABLE_BIOMETRIC'),
    leftItems: [
      {
        button: true,
        tint: 'onPrimary',
        icon: ChevronLeftIcon,
        buttonTitle: null,
        pressHandler: () => navigation.goBack(),
        buttonType: 'back-button',
        buttonSize: 'back',
      },
    ],
  };
  return (
    <Screen safeAreaMode="top" screenName={NavigableRoute.BIOMETRICS_MANAGEMENT}>
      <NavigationBar {...navigationBarProps} />
      <ScrollView>

        <FlexibleRow
          rightAction={{ type: 'switch', props: { state: true, onChange: onToggleSwitch } }}
          iconTint={'brand'}
          rightArrowHidden={true}
          mainContentTint="primary"
          mainContentTextType='bodyHeavyMedium1'
          mainContent={'Enable Biometric Login'}

        />

      </ScrollView>
    </Screen>
  );
}