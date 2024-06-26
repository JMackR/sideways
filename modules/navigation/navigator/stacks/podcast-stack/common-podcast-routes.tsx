import { FeatureVideosScreen, PlayerScreen } from '@upward/encourage/src/components/podcaster/src/screens';
import { FullScreenModalOptions } from '../../common-options';

export const commonPodcastRoutes = [
  {
    name: 'PlayerScreen',
    options: FullScreenModalOptions,
    component: PlayerScreen,
  },
  {
    name: 'FeatureVideosScreen',
    options: FullScreenModalOptions,
    component: FeatureVideosScreen,
  },
];
