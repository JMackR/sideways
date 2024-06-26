import { createStackNavigator } from '@react-navigation/stack';
import { NavigableRoute } from '@upward/navigation';
import { NavigatorParamList } from '../../types';
import { commonPodcastRoutes } from './common-podcast-routes';
import { TabNavigator } from './podcast-tab-navigator/tab-navigator';

export const PodCastNavigator = () => {
  const Stack = createStackNavigator<NavigatorParamList>();
  console.log('fire the stack');

  return (
    <>
      <Stack.Navigator initialRouteName={NavigableRoute.PODCASTS_STACK}>
        <Stack.Screen
          name={NavigableRoute.PODCAST_STACK}
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        {commonPodcastRoutes.map((route) => {
          return (
            <Stack.Screen key={route.name} name={route.name} component={route.component} options={route.options} />
          );
        })}
      </Stack.Navigator>
    </>
  );
};
