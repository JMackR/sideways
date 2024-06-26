import { PV } from '@upward/encourage/src/components/podcaster/src/resources';
import {
  EpisodeMediaRefScreen,
  EpisodeScreen,
  EpisodeTranscriptScreen,
} from '@upward/encourage/src/components/podcaster/src/screens';
import { FullScreenModalOptions } from '../../../common-options';

export const EpisodesNavigator = [
  {
    name: 'EpisodeScreen',
    options: FullScreenModalOptions,
    component: EpisodeScreen,
  },
  // {
  //     name: 'EpisodeScreen',
  //     options: FullScreenModalOptions,
  //     component: EpisodeScreen,
  // },
  {
    name: 'EpisodeMediaRefScreen',
    options: FullScreenModalOptions,
    component: EpisodeMediaRefScreen,
  },
  {
    name: 'EpisodeTranscriptScreen',
    options: FullScreenModalOptions,
    component: EpisodeTranscriptScreen,
  },
];
