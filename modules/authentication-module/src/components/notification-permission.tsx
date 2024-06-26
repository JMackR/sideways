import React, { useEffect } from 'react';

import { Button, Margin, SVG, Stack, Text } from '@upward/core-ui-library';
import { useAuthBootstrap } from '../hooks/useAuthBootstrap';

import { useColorForBackgroundColor, useTheme } from '@upward/themes';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { StorageController, USER_PRESENTED_NOTIFICATION, ms } from '@upward/utilities';
import { CircleBackgroundIcon, BellIcon } from '@upward/assets';
import { useTranslation } from 'react-i18next';

import { NavigableRoute } from '@upward/navigation';
import { StackActions, useNavigation } from '@react-navigation/native';

export const NotificationPermission = () => {
  const { setUserAuthorizedState, setUserEnrollment, setNotificationsEnable } = useAuthBootstrap();
  const navigation = useNavigation<any>();
  const themeBackground = useColorForBackgroundColor('baseBackground');
  const styles = useStyles();
  const { width, height } = useWindowDimensions();
  const colorScheme = useTheme();
  const { t } = useTranslation();
  const userPresentedNotification = StorageController(USER_PRESENTED_NOTIFICATION);

  const requestPushPermission = async () => {
    const options = {
      alert: true,
      badge: true,
      sound: true,
      provisional: false,
    };

    // setUserEnrollment(true);
    // setUserAuthorizedState(true);
    // setNotificationsEnable(true);
    navigation.navigate(NavigableRoute.LOCATION_PERMISSIONS);
    userPresentedNotification.setItem('true');
    // navigation.dispatch(StackActions.replace(NavigableRoute.COMMUNICATION_PREFERENCES));
  };

  const onNotNow = async () => {
    // setUserEnrollment(true);
    // setUserAuthorizedState(true);
    // setNotificationsEnable(false);

    userPresentedNotification.setItem('true');
    navigation.navigate(NavigableRoute.LOCATION_PERMISSIONS);
  };

  const { mainContainer, logoContainer, circleContainer, imageContainer } = styles;

  return (
    <View style={mainContainer}>
      <View style={logoContainer}>
        <View style={circleContainer}>
          <SVG
            tint={colorScheme.colorThemeId === 'dark_mode' ? 'onSecondary' : 'onInverseOutline'}
            localSVG={{
              SVG: CircleBackgroundIcon.SVG,
              size: { width, height },
            }}
          />
        </View>
        <View style={imageContainer}>
          <SVG
            tint={'onBrandAlt'}
            localSVG={{
              ...BellIcon,
              size: { width: ms(60), height: ms(60) },
            }}
          />
        </View>
      </View>

      <Margin marginBottomStep={4} marginTopStep={4} crossAxisDistribution="center" axisDistribution="center">
        <Stack direction="column" childSeparationStep={2}>
          <Text textAlign="center" textType="headerBold1">
            {t('onboard.ENABLE_NOTIFICATIONS')}
          </Text>
          <Margin direction="column" marginTopStep={4} marginBottomStep={4}>
            <Text textType="bodyRegular1" textAlign="center">
              {t('onboard.ENABLE_NOTIFICATIONS_TXT')}
            </Text>
          </Margin>
          <Margin marginBottomStep={2} direction="column">
            <Button
              accessibilityLabel={t('onboard.ENABLE_NOTIFICATIONS')}
              buttonSize="medium"
              buttonType="primary"
              title={t('onboard.ENABLE_NOTIFICATIONS')}
              onClick={() => requestPushPermission()}
            />
          </Margin>
          <Button
            buttonSize="medium"
            buttonType="inverse"
            tint="onBackground"
            titleColor="onBackground"
            title={t('onboard.NOT_NOW')}
            onClick={() => onNotNow()}
          />
        </Stack>
      </Margin>
    </View>
  );
};

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerLogo: {
      width: 200,
      height: 100,
    },
    logo: {
      alignSelf: 'center',
      width: 140,
      height: 100,
    },
    inputContainer: {
      marginVertical: 20,
    },
    inputText: {
      borderBottomWidth: 0,
    },
    button: {
      marginVertical: 10,
    },
    buttonText: {
      fontSize: ms(16),
      fontWeight: '600',
    },
    spacer: {
      marginVertical: 10,
    },
    imageContainer: {
      top: -60,
      left: 0,
    },
    circleContainer: {
      flex: 1,
      width: 182,
      height: 182,
    },
    logoContainer: {
      margin: 16,
      justifyContent: 'center',
      alignItems: 'center',
      height: 182,
    },
    mainContainer: {
      flex: 1,
      marginHorizontal: ms(16),
      marginTop: 20,
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
  });
