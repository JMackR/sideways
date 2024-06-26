import { Button, Margin, SVG, Stack, Text } from '@upward/core-ui-library';
import { Screen } from '@upward/core-ui-widgets/screen';
import { NavigableRoute } from '@upward/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { useAuthBootstrap } from '../hooks/useAuthBootstrap';
import { PermissionsLocationIcon } from '@upward/assets';

export const LocationPermissions = ({ navigation }) => {
  const { setUserAuthorizedState, setUserEnrollment, setNotificationsEnable } = useAuthBootstrap();
  const [permission, setPermission] = useState();

  const appState = useRef(AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const { t } = useTranslation();

  const requestAlways = async () => {
    request(
      Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS,
    )
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');

            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            navigation.navigate(NavigableRoute.HomeStack);
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            navigation.navigate(NavigableRoute.LocationRejected);
            break;
        }
      })
      .catch((error) => {});
  };

  const requestLocation = async () => {
    request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((result) => {
        console.log('what is the result?', result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            navigation.navigate(NavigableRoute.LocationRejected);
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            // requestAlways()
            setUserEnrollment(true);
            setUserAuthorizedState(true);
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            navigation.navigate(NavigableRoute.LocationRejected);
            break;
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const checkGranted = async () => {
      check(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log('This feature is not available (on this device / in this context)');
              break;
            case RESULTS.DENIED:
              console.log('The permission has not been requested / is denied but requestable');
              break;
            case RESULTS.LIMITED:
              console.log('The permission is limited: some actions are possible');
              break;
            case RESULTS.GRANTED:
              setUserEnrollment(true);
              setUserAuthorizedState(true);
              break;
            case RESULTS.BLOCKED:
              console.log('The permission is denied and not requestable anymore');
              break;
          }
        })
        .catch((error) => {});
    };

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        checkGranted();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const errorMessage = () => {
    navigation.navigate(NavigableRoute.AffirmRejectDialog, {
      onReject: () => navigation.navigate(NavigableRoute.HomeStack),
      onAffirm: () => requestLocation(),
      affirmText: 'Yes',
      rejectText: 'Not Now',
      icon: PermissionsLocationIcon,
      title: 'Wait!',
      body: `Loop understands your concern for privacy, \n\nLoop will never share your location with any 3rd parties and only use this information to evaluate your driving score.\n\n Will you allow us access to your location?`,
    });
  };
  const onNotNow = async () => {
    setUserEnrollment(true);
    setUserAuthorizedState(true);
    // setNotificationsEnable(false);

    navigation.navigate(NavigableRoute.LOCATION_PERMISSIONS);
  };
  return (
    <Screen safeAreaMode={'all'} screenName={'permissions-location'}>
      <Margin direction={'column'} crossAxisDistribution="center" marginLeftStep={4} marginRightStep={4}>
        <Stack direction={'column'} crossAxisDistribution="center">
          <SVG localSVG={{ SVG: PermissionsLocationIcon.SVG, size: { height: 85, width: 76 } }} />
          <Text textType={'bodyHeavy1'} color="primary" textAlign={'center'} testID={'permissions-location.title'}>
            {' '}
            Location Permission Request
          </Text>
          <Text textType="bodyMedium1" color="primary" textAlign={'center'} testID={'permissions-location.body'}>
            If you wanna track your runs, you really need to trust me and enable this
          </Text>
          {/* </Margin> */}
        </Stack>
      </Margin>
      <Margin direction={'column'} axisDistribution={'center'} marginLeftStep={4} marginRightStep={4}>
        <Margin marginBottomStep={2} direction="column">
          <Button
            testID={'permissions-location.allow'}
            title={'Enable Location'}
            buttonType={'primary'}
            buttonSize={'large'}
            onClick={requestLocation}
          />
        </Margin>
        <Button
          buttonSize="large"
          buttonType="inverse"
          tint="onBackground"
          titleColor="onBackground"
          title={t('onboard.NOT_NOW')}
          onClick={() => onNotNow()}
        />
      </Margin>
    </Screen>
  );
};
