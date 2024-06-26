import { useState, useEffect } from 'react';
import { useWindowDimensions, View, Platform } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthBootstrap, useBiometrics } from '@upward/authentication';
import { DropdownAlert, Screen } from '@upward/core-ui-widgets';
import { Button, Margin, SVG, Text } from '@upward/core-ui-library';
import { CircleBackgroundIcon, ErrorFaceIcon, FaceIDIcon, FingerprintIcon } from '@upward/assets';
import { useTheme, useColorForBackgroundColor } from '@upward/themes';
import { NavigableRoute } from '@upward/navigation';
import { ms } from '@upward/utilities';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '@upward/store';

export const Biometrics = ({ route }: { route: any }) => {
  const email = route?.params?.email;
  const colorScheme = useTheme();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const { t } = useTranslation();

  const [enable, setEnableBiometrics] = useState<boolean>(false);
  const biometrics = useBiometrics();

  const themeBackground = useColorForBackgroundColor('baseBackground');
  const { setBiometricsEnable, userBiometricsEnabled, setUserAuthorizedState, setUserEnrollment } = useAuthBootstrap();

  useEffect(() => {
    const checkBioMetrics = async () => {
      if (enable) {
        try {
          if (biometrics.isBiometricsSupported) {
            /**
             * NEEDED TO PROMPT USER THE FIRST TIME FOR PERMISSION FROM APPLE
             */

            await biometrics.promptBiometrics();
            /**
             * REQUEST PASSWORD FROM BSWIFT TO USE FOR BIOMETRIC LOGIN
             */

            getPassword(currentUser.uid);
          } else if (!biometrics.isBiometricsSupported) {
            /**
             * BIOMETRICS NOT ENABLED ON DEVICE ALLOW USER TO SETUP FACEID THEN COME BACK TO APP AND ENABLE
             */

            DropdownAlert.show({
              title: t('onboard.FACE_ID_ALERT_1'),
              message: t('onboard.FACE_ID_MESSAGE_1'),
              type: 'error',
              autoHide: false,
              renderIcon: () => (
                <SVG
                  tint={'primary'}
                  localSVG={{
                    ...ErrorFaceIcon,
                  }}
                />
              ),
            });
          }
        } catch (error) {
          /**
           * ERROR SAVING DEVICE ID TO SERVER
           */

          DropdownAlert.show({
            title: t('onboard.SERVER_ERROR'),
            message: t('onboard.CONTACT_BSWIFT'),
            type: 'error',
            autoHide: false,
            renderIcon: () => (
              <SVG
                tint={'primary'}
                localSVG={{
                  ...ErrorFaceIcon,
                }}
              />
            ),
          });
        }
      }
    };
    checkBioMetrics();
  }, [enable, biometrics?.isBiometricsSupported]);

  useEffect(() => {
    const setDeviceId = async () => {
      if (!userBiometricsEnabled) {
        const userName: any = currentUser.email;
        /**
         * STORE EMAIL AND GENERATED PASSWORD IN KEYCHAIN
         */

        biometrics.enableBiometrics(userName, password);

        const deviceID = await getUniqueId();
        const token = await AsyncStorage.getItem('@AntiForgeryToken');
        /**
         * SEND DEVICE ID TO BSWIFT FOR DEVICE CHECK and BIOMETRIC LOGIN
         */
        if (deviceID && token) {
          setBiometricEnrolled({ deviceID, token });
        }
        setBiometricsEnable(true);
        setUserEnrollment(true);
        setUserAuthorizedState(true);

        // setTimeout(() => {
        //   navigation.dispatch(StackActions.replace(NavigableRoute.NOTIFICATION_PERMISSION));
        // }, 500);
      }
    };
    setDeviceId();
  }, [userBiometricsEnabled]);

  const enableBiometrics = async () => {
    setEnableBiometrics(true);
  };

  const optOutBiometrics = async () => {
    setUserEnrollment(true);
    setUserAuthorizedState(true);
    // navigation.dispatch(StackActions.replace(NavigableRoute.NOTIFICATION_PERMISSION));
  };

  const biometricIcon = Platform.OS === 'ios' ? FaceIDIcon : FingerprintIcon;

  return (
    <Screen
      safeAreaMode="all"
      screenName={NavigableRoute.BIOMETRICS}
      backgroundColor={themeBackground}
      barStyle={colorScheme.colorThemeId === 'dark_mode' ? 'light-content' : 'dark-content'}
    >
      <View>
        <View>
          <View>
            <SVG
              tint={colorScheme.colorThemeId === 'dark_mode' ? 'onSecondary' : 'onInverseOutline'}
              localSVG={{
                SVG: CircleBackgroundIcon.SVG,
                size: { width, height },
              }}
            />
          </View>
          <View>
            <SVG
              tint={'onBackground'}
              localSVG={{
                ...biometricIcon,
                size: { width: ms(60), height: ms(60) },
              }}
            />
          </View>
        </View>
        <View>
          <Margin marginBottomStep={4} marginTopStep={4} crossAxisDistribution="center" axisDistribution="center">
            <Text textType="headerBold1" textAlign="center">
              {t('onboard.BIOMETRIC_LOGIN')}
            </Text>
          </Margin>
          <Margin marginBottomStep={6} crossAxisDistribution="center" axisDistribution="center">
            <Text textType="bodyHeavy2" textAlign="center">
              {t('onboard.ACCESS_ACCOUNT')}
            </Text>
          </Margin>
        </View>
        <View>
          <Margin direction="column" marginBottomStep={4}>
            <Button
              onClick={() => enableBiometrics()}
              buttonSize="medium"
              buttonType="primary"
              title={t('onboard.ENABLE_BIOMETRIC')}
              testID="ENABLE_BIOMETRIC"
            />
          </Margin>

          <Button
            onClick={() => optOutBiometrics()}
            tint="onDisabled"
            buttonType={colorScheme.colorThemeId === 'dark_mode' ? 'dark' : 'inverse'}
            buttonSize="medium"
            title={t('onboard.NOT_NOW')}
            titleColor={colorScheme.colorThemeId === 'light_mode' ? 'onDisabled' : 'onBackground'}
            testID={t('onboard.NOT_NOW')}
          />
        </View>
      </View>
    </Screen>
  );
};
