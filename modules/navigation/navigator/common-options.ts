import { AnimationType } from '@upward/constants';

import { TransitionPresets, type StackNavigationOptions } from '@react-navigation/stack';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import { Easing } from 'react-native';

/**
 * Transition Configs
 */

const modalDialogOverlayTransitionConfig: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 350,
    easing: Easing.inOut(Easing.poly(2)),
  },
};

export const FadeInFullScreen: StackNavigationOptions = {
  gestureEnabled: false,
  detachPreviousScreen: false,
  headerShown: false,
  presentation: 'card',
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
};

export const ModalDialogOverlayOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  detachPreviousScreen: false,
  headerShown: false,
  cardOverlayEnabled: true,
  presentation: 'modal',
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: modalDialogOverlayTransitionConfig,
    close: modalDialogOverlayTransitionConfig,
  },
};

export const ForcedFullScreenModalOptions: StackNavigationOptions = {
  gestureEnabled: false,
  ...TransitionPresets.ModalSlideFromBottomIOS,
  headerBackTitleVisible: false,
  presentation: 'modal',
  headerStyle: {
    shadowColor: 'transparent',
  },
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
};

export const FullScreenModalOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
  headerShown: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
};

export const PushPopStackAnimationOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  gestureEnabled: false,
  headerShown: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
};
