import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FamilyFillIcon,
  FamilyIcon,
  HandHoldingHeartFillIcon,
  HandHoldingHeartIcon,
  HouseFillIcon,
  HouseIcon,
  IdCardFillIcon,
  IdCardIcon,
} from '@upward/assets';
import { LocalSVGSource, SVG } from '@upward/core-ui-library';
import { NavigableRoute } from '@upward/navigation';
import { ms } from '@upward/utilities';
import React from 'react';
import { TabBarWidget } from './tab-bar-widget';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../../../types';
import { HomeStackNavigator } from '../../home-stack';
// import { EpisodesNavigator } from '../podcast-stacks/episodes-stack';
import { LibaryNavigator } from '../podcast-stacks/library-stack';
import { MoreNavigator } from '../podcast-stacks/more-stack';
import { PodcastsNavigator } from '../podcast-stacks/podcasts-stack';
import { Image } from 'react-native';
// import { PV } from '@upward/encourage/src/resources';

// const createNavigationOptions = (title: string, fillSVG: LocalSVGSource, outlineSVG: LocalSVGSource) => () => ({
//   tabBarIcon: (props: { focused: boolean }) => (
//     <SVG
//       localSVG={{
//         SVG: props.focused ? fillSVG.SVG : outlineSVG.SVG,
//         size: { width: ms(22), height: ms(22) },
//       }}
//       tint={props.focused ? 'alwaysLight' : 'secondary'}
//     />
//   ),
//   title,
// });

const createNavigationOptions =
  (
    title: string,
    image: any,
    // tintColor: LocalSVGSource,
    outlineSVG: LocalSVGSource,
  ) =>
  () => ({
    tabBarIcon: (props: { focused: boolean }) => (
      <Image
        source={image}
        // style={{ tintColor }}
        resizeMode={'contain'}
      />
    ),
    title,
  });

const HomeOptions = createNavigationOptions('home.NAV_TITLE', HouseFillIcon, HouseIcon);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TrainingOptions = createNavigationOptions(
  'podcast.PODCASTS_TAB',
  require('./images/tab-icons/tab-podcasts.png'),
  HandHoldingHeartIcon,
);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GroupsOptions = createNavigationOptions(
  'podcast.LIBRARY_TAB',
  require('./images/tab-icons/tab-queue.png'),
  FamilyIcon,
);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StatsOptions = createNavigationOptions(
  'podcast.MORE_TAB',
  require('./images/tab-icons/tab-more.png'),
  IdCardIcon,
);

export const TabRoutes = [
  {
    name: NavigableRoute.HOME_STACK,
    routes: HomeStackNavigator,
    options: HomeOptions,
  },
  {
    name: NavigableRoute.PODCASTS_STACK,
    routes: PodcastsNavigator,
    options: TrainingOptions,
  },
  // {
  //   name: NavigableRoute.EPISODES_STACK,
  //   routes: EpisodesNavigator,
  //   options: TrainingOptions,
  // },

  {
    name: NavigableRoute.LIBRARY_STACK,
    routes: LibaryNavigator,
    options: GroupsOptions,
  },
  {
    name: NavigableRoute.MORE_STACK,
    routes: MoreNavigator,
    options: StatsOptions,
  },
];

const Tabs = createBottomTabNavigator();
const tabBarFunc = (props: BottomTabBarProps) => <TabBarWidget {...props} />;

const Stack = createNativeStackNavigator<NavigatorParamList>();

export const createStack = (routes: any, screenOptions?: any) => (
  <Stack.Navigator screenOptions={screenOptions}>
    {routes.map(({ name, component, options, initialParams }) => (
      <Stack.Screen key={name} name={name} component={component} options={options} initialParams={initialParams} />
    ))}
  </Stack.Navigator>
);

export const TabNavigator = () => (
  <Tabs.Navigator
    tabBar={tabBarFunc}
    initialRouteName={NavigableRoute.PODCASTS_STACK}
    screenOptions={{
      headerShown: false,
    }}
  >
    {TabRoutes.map(
      ({ name, options, routes, screenOptions }: { name: any; options: any; routes: any; screenOptions?: any }) => (
        <Tabs.Screen key={name} name={name} options={options}>
          {() => createStack(routes, screenOptions)}
        </Tabs.Screen>
      ),
    )}
  </Tabs.Navigator>
);
