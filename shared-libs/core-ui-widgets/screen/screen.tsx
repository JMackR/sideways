import React, { useEffect, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { SCREEN_PROVIDER_DEFAULT_SCREEN_NAME, ScreenProvider } from './provider';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ScreenProps } from './screen-props';
import KeyboardManager from 'react-native-keyboard-manager';
import { AnalyticsController } from '@upward/analytics';
import { useColorForBackgroundColor } from '@upward/themes';

export const Screen: React.FC<ScreenProps> = (props) => {
  const { children, safeAreaMode, testID, screenName, dismissKeyboardOnTap, onBlur, onFocus, barStyle } = props;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const routeName = route?.name;
  const colorScheme = useColorScheme();
  const isLandscape = () => Dimensions.get('window').width > Dimensions.get('window').height;

  const onFocusEffect = React.useCallback(() => {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      const offset = isLandscape() ? 180 : 120;
      KeyboardManager.setKeyboardDistanceFromTextField(offset);
      KeyboardManager.setShouldShowToolbarPlaceholder(false);
    }
  }, []);

  useFocusEffect(onFocusEffect);

  useEffect(() => {
    navigation.addListener('focus', () => {
      // screenName && AnalyticsController.trackScreenView(screenName, route.name);
    });
  }, [navigation]);

  useEffect(() => {
    navigation.addListener('blur', () => {});
  }, [navigation]);

  const baseBackground = useColorForBackgroundColor('primary');

  const styles = StyleSheet.create({
    screenStyle: {
      flex: 1,
      backgroundColor: baseBackground,
    },
  });

  const safeAreaStyle: ViewStyle = useMemo(() => {
    const style: ViewStyle = {};
    switch (safeAreaMode) {
      case 'bottom':
        style.paddingBottom = insets.bottom;
        style.backgroundColor = baseBackground;
        break;
      case 'none':
        style.backgroundColor = baseBackground;
        break;
      case 'top':
        style.paddingTop = insets.top;
        style.backgroundColor = baseBackground;
        break;
      case 'all':
        style.paddingTop = insets.top;
        style.paddingBottom = insets.bottom;
        style.paddingLeft = insets.left;
        style.paddingRight = insets.right;
        style.backgroundColor = baseBackground;
        break;
      default:
        style.paddingTop = insets.top;
        style.paddingBottom = insets.bottom;
        style.paddingLeft = insets.left;
        style.paddingRight = insets.right;
        break;
    }
    return style;
  }, [insets, safeAreaMode, colorScheme, baseBackground]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const loginScreens = [
    'EMAIL_VERIFICATION',
    'PHONE_ENTRY',
    'PHONE_VERIFICATION',
    'BIOMETRICS',
    'MULTIPLE_ACCOUNT_SELECT',
  ];
  const androidBackground = () => {
    if (loginScreens.some((name) => name === routeName)) {
      return baseBackground;
    } else {
      return baseBackground;
    }
  };

  return (
    <>
      <ScreenProvider screenName={screenName}>
        <View style={[safeAreaStyle]} testID="main-view" />
        <View style={[styles.screenStyle]} testID={testID} accessibilityLabel={testID}>
          <StatusBar
            barStyle={!barStyle ? 'light-content' : barStyle}
            translucent
            backgroundColor={androidBackground()}
          />
          {dismissKeyboardOnTap ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={dismissKeyboard}
              style={{ flexDirection: 'column', flexGrow: 1 }}
            >
              {children}
            </TouchableOpacity>
          ) : (
            children
          )}
        </View>
      </ScreenProvider>
    </>
  );
};
