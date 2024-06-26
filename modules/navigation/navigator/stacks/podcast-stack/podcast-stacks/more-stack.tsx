import { PV } from '@upward/encourage/src/components/podcaster/src/resources';
import {
  MoreScreen,
  SettingsScreen,
  SettingsScreenAccount,
  SettingsScreenAdvanced,
  SettingsScreenChapters,
  SettingsScreenDownloads,
  SettingsScreenHistory,
  SettingsScreenNotifications,
  SettingsScreenPlayer,
} from '@upward/encourage/src/components/podcaster/src/screens';
import { FullScreenModalOptions } from '../../../common-options';

export const MoreNavigator = [
  {
    name: 'MoreScreen',
    component: MoreScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'SettingsScreen',
    component: SettingsScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'SettingsScreenAccount',
    component: SettingsScreenAccount,
    options: FullScreenModalOptions,
  },
  {
    name: 'SettingsScreenAdvanced',
    component: SettingsScreenAdvanced,
    options: FullScreenModalOptions,
  },
  {
    name: 'SettingsScreenChapters',
    component: SettingsScreenChapters,
    options: FullScreenModalOptions,
  },
  {
    name: 'SettingsScreenDownloads',
    component: SettingsScreenDownloads,
    options: FullScreenModalOptions,
  },
  {
    name: 'SettingsScreenHistory',
    component: SettingsScreenHistory,
    options: FullScreenModalOptions,
  },
  {
    name: 'SettingsScreenNotifications',
    component: SettingsScreenNotifications,
    options: FullScreenModalOptions,
  },
  {
    name: 'SettingsScreenPlayer',
    component: SettingsScreenPlayer,
    options: FullScreenModalOptions,
  },
];
