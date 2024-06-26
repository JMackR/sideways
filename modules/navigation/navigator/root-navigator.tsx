import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthBootstrap } from '@upward/authentication';
import { NavigableRoute } from '@upward/navigation';
import { ForcedFullScreenModalOptions, FullScreenModalOptions } from './common-options';
import { OnboardingStackNavigator } from './stacks/onboarding-navigator';
import { PodCastNavigator } from './stacks/podcast-stack/podcast-stack';
import { TabNavigator } from './tab-navigator/tab-navigator';
import { SplashScreen } from '@upward/core-ui-widgets';
import { commonRoutes } from './common-routes';

export const RootNavigator = () => {
  const Stack = createStackNavigator();
  const bootstrap = useAuthBootstrap();

  if (bootstrap.initializing) {
    return <SplashScreen />;
  }
  return (
    <>
      <NavigationContainer>
        {!bootstrap.userAuthorized ? (
          <Stack.Navigator initialRouteName={NavigableRoute.ONBOARDING_STACK}>
            <Stack.Screen
              name={NavigableRoute.ONBOARDING_STACK}
              component={OnboardingStackNavigator}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName={NavigableRoute.APP_STACK}>
            <Stack.Screen
              name={NavigableRoute.APP_STACK}
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />
            {commonRoutes.map((route) => {
              return (
                <Stack.Screen key={route.name} name={route.name} component={route.component} options={route.options} />
              );
            })}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};
