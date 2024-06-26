import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import {
  LandingScreen,
  LocationPermissions,
  NotificationPermission,
  OnboardingCoordinator,
  useCoordinator,
  Footer,
} from '@upward/authentication';
import { AnimationType } from '@upward/constants/animation-constants';
import type { NavigationPayload } from '../../../types';
import { NavigableRoute } from '../../routes';
import { Easing } from 'react-native';
import { Flex } from '@upward/core-ui-library';
import SafeAreaView from 'react-native-safe-area-view';
import { useAuthBootstrap } from '@upward/authentication';

export type OnboardingStackNavigatorParamList = {
  [NavigableRoute.ONBOARDING_NAV]: NavigationPayload<undefined>;
  [NavigableRoute.ONBOARDING_LANDING]: NavigationPayload<undefined>;
  [NavigableRoute.EMAIL_SIGNIN]: NavigationPayload<undefined>;
  [NavigableRoute.EMAIL_VERIFICATION]: NavigationPayload<undefined>;
  [NavigableRoute.BIOMETRICS]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_1]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_2]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_3]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_4]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_5]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_6]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_7]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_8]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_9]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_10]: NavigationPayload<undefined>;
  [NavigableRoute.STEP_11]: NavigationPayload<undefined>;
};

const Stack = createStackNavigator();
const OnboardingsStepsStack = createStackNavigator();

export const OnboardingStackNavigator: React.FC = () => {
  const bootstrap = useAuthBootstrap();
  return (
    <OnboardingCoordinator>
      <OnboardingStackRoutes {...bootstrap} />
    </OnboardingCoordinator>
  );
};

const OnboardingStackContainer = () => {
  const { viewModel } = useCoordinator();

  const displayFooter = viewModel.footerVisible;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex direction="row" grow={1} crossAxisDistribution="stretch">
        <OnboardingsStepsNavigator />
      </Flex>
      {displayFooter && (
        <Flex direction="row" shrink={0} crossAxisDistribution="stretch">
          <Footer />
        </Flex>
      )}
    </SafeAreaView>
  );
};
const OnboardingStackRoutes = (bootstrap) => {
  return (
    <Stack.Navigator
      initialRouteName={bootstrap.userEnrolled ? NavigableRoute.ONBOARDING_NAV : NavigableRoute.ONBOARDING_LANDING}
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen
        name={NavigableRoute.ONBOARDING_LANDING}
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigableRoute.ONBOARDING_NAV}
        component={OnboardingStackContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigableRoute.NOTIFICATION_PERMISSIONS}
        component={NotificationPermission}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigableRoute.LOCATION_PERMISSIONS}
        component={LocationPermissions}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const OnboardingsStepsNavigator = () => {
  const { viewModels } = useCoordinator();
  return (
    <OnboardingsStepsStack.Navigator screenOptions={{ headerShown: false }}>
      {viewModels.map((viewModel) => {
        return (
          <OnboardingsStepsStack.Screen
            key={viewModel.screenName}
            name={viewModel.screenName}
            component={viewModel.screenComponent}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: viewModel.navGestureEnabled,
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
            }}
          />
        );
      })}
    </OnboardingsStepsStack.Navigator>
  );
};
