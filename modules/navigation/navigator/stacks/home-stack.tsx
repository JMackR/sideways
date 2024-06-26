import { Dashboard } from '@upward/dashboard';
import { NavigableRoute } from '@upward/navigation';
import { FadeInFullScreen } from '../common-options';
import { ManageBiometrics, ManageNotifications, ManageProfile, ProfileMain } from '@upward/user';

export const HomeStackNavigator = [
  {
    name: NavigableRoute.HOME,
    component: Dashboard,
    options: FadeInFullScreen,
  },
  {
    name: 'PROFILE_MAIN',
    component: ProfileMain,
    options: { headerShown: false },
  },
  {
    name: 'MANAGE_PROFILE',
    component: ManageProfile,
    options: { headerShown: false },
  },
  {
    name: 'NOTIFICATIONS_MANAGEMENT',
    component: ManageNotifications,
    options: { headerShown: false },
  },
  {
    name: 'BIOMETRICS_MANAGEMENT',
    component: ManageBiometrics,
    options: { headerShown: false },
  },
];
