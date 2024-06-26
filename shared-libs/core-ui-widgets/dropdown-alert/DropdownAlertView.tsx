// @ts-nocheck
import React, { useImperativeHandle, forwardRef, useState, useEffect, useCallback, useRef } from 'react';
import { Dimensions, View, Image, StyleSheet, StatusBar, ViewStyle, ImageStyle } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Message, { MessageProps } from './components/Message';
import ModalCustom from './components/ModalCustom';
import Title, { TitleProps } from './components/Title';
import { images } from './images';
import { defaultTimingConfig, isNullOrUndefined } from './utils';

export type DropdownAlertType = 'info' | 'warning' | 'success' | 'error';

export interface DropdownAlertViewProps {
  title?: string;
  message?: string;
  type?: DropdownAlertType;
  timeDismiss?: number;
  autoHide?: boolean;
  infoColor?: string;
  warnColor?: string;
  errorColor?: string;
  successColor?: string;
  timingAnimationConfig?: Object;
  onHide?: () => void;
  showStatusBar?: boolean;
  renderIcon?: React.FC;
  titleProps?: TitleProps;
  messageProps?: MessageProps;
  testIDDropdown?: string;
  accessibilityLabelDropdown?: string;
  contentStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  renderContent?: React.FC;
}

const SCREEN = Dimensions.get('window');

function DropdownAlertViewComponent(props: DropdownAlertViewProps, ref: any) {
  const {
    title,
    message,
    type,
    timeDismiss,
    autoHide,
    infoColor,
    warnColor,
    errorColor,
    successColor,
    timingAnimationConfig,
    onHide,
    showStatusBar,
    renderIcon,
    titleProps,
    messageProps,
    testIDDropdown,
    accessibilityLabelDropdown,
    imageStyle,
    renderContent,
  } = props;
  const [visible, setVisible] = useState(false);
  const [statusBarVisible, setStatusBarVisible] = useState(false);
  const translateY = useSharedValue(0);
  const _mounted = useRef(null);
  const _timeoutDismiss = useRef(null);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
      setStatusBarVisible(true);
    },
    hide: () => {
      dismissDropdown();
    },
  }));

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(SCREEN.height, timingAnimationConfig, () => {
        if (autoHide) {
          runOnJS(autoHideDropdown)();
        }
      });
    }
  }, [visible, autoHide]);

  useEffect(() => {
    _mounted.current = true;

    return () => {
      _mounted.current = false;
    };
  }, []);

  const autoHideDropdown = useCallback(() => {
    if (_timeoutDismiss.current) {
      clearTimeout(_timeoutDismiss.current);
    }

    _timeoutDismiss.current = setTimeout(() => {
      dismissDropdown();
    }, timeDismiss);
  }, [_timeoutDismiss.current, timeDismiss]);

  const dismissDropdown = useCallback(() => {
    setStatusBarVisible(false);
    translateY.value = withTiming(0, { duration: 100 }, () => {
      runOnJS(oncancel)();
    });
  }, [oncancel]);

  const onPanGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = event.translationY + ctx.y;
    },
    onFinish: () => {
      if (translateY.value > SCREEN.height - 20) {
        translateY.value = withTiming(SCREEN.height, timingAnimationConfig);
      } else {
        runOnJS(dismissDropdown)();
      }
    },
  });

  const oncancel = useCallback(() => {
    if (_timeoutDismiss.current) {
      clearTimeout && clearTimeout(_timeoutDismiss.current);
    }

    _mounted.current && setVisible(false);
    onHide && onHide();
  }, [onHide, _mounted.current, _timeoutDismiss.current]);

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: Math.min(translateY.value, SCREEN.height) }],
    };
  });

  const safeArea = useSafeAreaInsets();
  const imageSource =
    type === 'info' ? images.info : type === 'error' ? images.error : type === 'warning' ? images.warn : images.success;
  const backgroundColor =
    type === 'info' ? infoColor : type === 'error' ? errorColor : type === 'warning' ? warnColor : successColor;

  return (
    <ModalCustom nativeModal={false} visible={visible}>
      {showStatusBar && statusBarVisible && (
        <StatusBar backgroundColor={backgroundColor} barStyle="light-content" animated />
      )}
      <PanGestureHandler onGestureEvent={onPanGesture}>
        <Animated.View style={[styles.container, { backgroundColor, paddingTop: safeArea.top }, contentStyle]}>
          {renderContent ? (
            typeof renderContent === 'function' ? (
              renderContent()
            ) : (
              renderContent
            )
          ) : (
            <View
              testID={testIDDropdown}
              accessibilityLabel={accessibilityLabelDropdown}
              style={[styles.viewContent, props.contentStyle]}
            >
              {renderIcon && renderIcon()}
              <View style={styles.content}>
                {!isNullOrUndefined(title) && <Title numberOfLines={2} {...titleProps} value={title} />}
                {!isNullOrUndefined(message) && <Message numberOfLines={3} {...messageProps} value={message} />}
              </View>
            </View>
          )}
        </Animated.View>
      </PanGestureHandler>
    </ModalCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -SCREEN.height,
  },
  viewContent: {
    margin: 10,
    flexDirection: 'row',
    minHeight: 65,
  },
  image: {
    padding: 8,
    width: 36,
    height: 36,
    alignSelf: 'center',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
});

const DropdownAlertView = React.memo(forwardRef(DropdownAlertViewComponent));

export default DropdownAlertView;
