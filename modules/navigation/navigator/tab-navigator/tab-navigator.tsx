import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CircleEllipsisIcon,
  EllipsisIcon,
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
import { GroupsStackNavigator } from '../stacks/groups-stack';
import { HomeStackNavigator } from '../stacks/home-stack';
import { StatsStackNavigator } from '../stacks/stats-stack';
import { StoreStackNavigator } from '../stacks/store-stack';
import { TrainingStackNavigator } from '../stacks/training-stack';
import { NavigatorParamList } from '../types';

const createNavigationOptions = (title: string, fillSVG: LocalSVGSource, outlineSVG: LocalSVGSource) => () => ({
  tabBarIcon: (props: { focused: boolean }) => (
    <SVG
      localSVG={{
        SVG: props.focused ? fillSVG.SVG : outlineSVG.SVG,
        size: { width: ms(22), height: ms(22) },
      }}
      tint={props.focused ? 'brand' : 'secondary'}
    />
  ),
  title,
});

const HomeOptions = createNavigationOptions('home.NAV_TITLE', HouseIcon, HouseIcon);
const TrainingOptions = createNavigationOptions('training.NAV_TITLE', HandHoldingHeartFillIcon, HandHoldingHeartIcon);
const GroupsOptions = createNavigationOptions('groups.NAV_TITLE', FamilyFillIcon, FamilyIcon);
const StatsOptions = createNavigationOptions('stats.NAV_TITLE', IdCardFillIcon, IdCardIcon);
const StoreOptions = createNavigationOptions('store.NAV_TITLE', EllipsisIcon, CircleEllipsisIcon);

export const TabRoutes = [
  {
    name: NavigableRoute.HOME_STACK,
    routes: HomeStackNavigator,
    options: HomeOptions,
  },
  {
    name: NavigableRoute.TRAINING_STACK,
    routes: TrainingStackNavigator,
    options: TrainingOptions,
  },

  {
    name: NavigableRoute.GROUPS_STACK,
    routes: GroupsStackNavigator,
    options: GroupsOptions,
  },
  {
    name: NavigableRoute.STATS_STACK,
    routes: StatsStackNavigator,
    options: StatsOptions,
  },
  {
    name: NavigableRoute.STORE_STACK,
    routes: StoreStackNavigator,
    options: StoreOptions,
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
    initialRouteName={NavigableRoute.HOME_STACK}
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
