import { PV } from '@upward/encourage/src/components/podcaster/src/resources';
import {
  EpisodeMediaRefScreen,
  EpisodeScreen,
  EpisodeTranscriptScreen,
  PodcastScreen,
  PodcastsScreen,
} from '@upward/encourage/src/components/podcaster/src/screens';
import { FullScreenModalOptions } from '../../../common-options';
import { PodcastInfoScreen } from '@upward/encourage/src/components/podcaster/src/screens/PodcastInfoScreen';

export const PodcastsNavigator = [
  {
    name: 'PodcastsScreen',
    component: PodcastsScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'PodcastScreen',
    component: PodcastScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'PodcastInfoScreen',
    component: PodcastInfoScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'EpisodeScreen',
    component: EpisodeScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'EpisodeMediaRefScreen',
    component: EpisodeMediaRefScreen,
    options: FullScreenModalOptions,
  },
  {
    name: 'EpisodeTranscriptScreen',
    component: EpisodeTranscriptScreen,
    options: FullScreenModalOptions,
  },
];
