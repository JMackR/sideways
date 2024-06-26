import { PV } from '@upward/encourage/src/components/podcaster/src/resources';
import {
  AlbumScreen,
  AlbumsScreen,
  DownloadsScreen,
  EditPlaylistScreen,
  EditProfileScreen,
  HistoryScreen,
  MyLibraryScreen,
  PlaylistScreen,
  PlaylistsScreen,
  ProfileScreen,
  QueueScreen,
} from '@upward/encourage/src/components/podcaster/src/screens';

import { FullScreenModalOptions } from '../../../common-options';

export const LibaryNavigator = [
  {
    name: 'MyLibraryScreen',
    component: MyLibraryScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'HistoryScreen',
    component: HistoryScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'DownloadsScreen',
    component: DownloadsScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'PlaylistScreen',
    component: PlaylistScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'QueueScreen',
    component: QueueScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'MyProfileScreen',
    component: ProfileScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'EditProfileScreen',
    component: EditProfileScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'PlaylistsScreen',
    component: PlaylistsScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'EditPlaylistScreen',
    component: EditPlaylistScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'AlbumsScreen',
    component: AlbumsScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'AlbumScreen',
    component: AlbumScreen,
    options: FullScreenModalOptions,
  },
];
