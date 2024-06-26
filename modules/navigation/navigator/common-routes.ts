import { ProfileMain, ManageProfile, ManageNotifications, ManageBiometrics } from '@upward/user';
import { BibleReader } from '@upward/encourage';
import { FullScreenModalOptions } from './common-options';
import { NavigableRoute } from './routes';
import { PodCastNavigator } from './stacks/podcast-stack/podcast-stack';

export const commonRoutes = [
  {
    name: NavigableRoute.PODCAST_APP,
    component: PodCastNavigator,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.BIBLE_READER,
    component: BibleReader,
    options: { headerShown: false },
  },

  {
    name: 'AFFIRM_REJECT_MODAL',
    component: ProfileMain,
    options: { headerShown: false },
  },
  {
    name: 'DATE_ENTRY',
    component: ProfileMain,
    options: { headerShown: false },
  },
  {
    name: 'COMPLETION_MODAL',
    component: ProfileMain,
    options: { headerShown: false },
  },
  {
    name: 'SELECT_PLAN_MODAL',
    component: ProfileMain,
    options: { headerShown: false },
  },
  {
    name: 'LOCATION_REQUEST',
    component: ProfileMain,
    options: { headerShown: false },
  },
  {
    name: 'PUSHNOTIFICATION_REQUEST',
    component: ProfileMain,
    options: { headerShown: false },
  },
];
