import { NavigableRoute } from '@upward/navigation';
import { TodaysPlan, TrainingMain } from '@upward/training';
// import { Training } from '@upward/training';
// import Tracking from '@upward/training/src/pages/Tracking';
// import Map from '@upward/training/src/pages/Map';
// import Submit from '@upward/training/src/pages/Submit';
// import {
//   OfflineExample,
//   AnimatedLine,
//   CustomNativeUserLocation,
//   UserLocationPadding,
//   UserLocationRenderMode,
//   UserLocationUpdates,
// } from '@upward/training/mapbox';
// import DriveTheLine from '@upward/training/mapbox/src/examples/Animations/DriveTheLine';
export const TrainingStackNavigator = [
  {
    name: NavigableRoute.TRAINING_MAIN,
    component: TrainingMain,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.VIEW_PLAN,
    component: TodaysPlan,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.CHANGE_PLAN,
    component: TodaysPlan,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.CHALLENGES,
    component: TodaysPlan,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.TRAINING_PLANS_SELECT,
    component: TodaysPlan,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.TRAINING_PLAN_OVERVIEW,
    component: TodaysPlan,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.CURRENT_CHALLENGE,
    component: TodaysPlan,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.ACTIVITY_ENTRY,
    component: TodaysPlan,
    options: { headerShown: false },
  },
  // {
  //   name: "UserLocationRenderMode",
  //   component: UserLocationRenderMode,
  //   options: { headerShown: false },
  // },
  // {
  //   name: "UserLocationUpdates",
  //   component: UserLocationUpdates,
  //   options: { headerShown: false },
  // },
  // {
  //   name: "CustomNativeUserLocation",
  //   component: CustomNativeUserLocation,
  //   options: { headerShown: false },
  // },
  // {
  //   name: 'DriveTheLine',
  //   component: DriveTheLine,
  //   options: { headerShown: false },
  // },
  // {
  //   name: "TRAINING_STACK",
  //   component: Training,
  //   options: { headerShown: false },
  // },
  // {
  //   name: "Tracking",
  //   component: Tracking,
  //   options: { headerShown: false },
  // },
  // {
  //   name: "Map",
  //   component: Map,
  //   options: { headerShown: false },
  // },
  // {
  //   name: "Submit",
  //   component: Submit,
  //   options: { headerShown: false },
  // },
];
