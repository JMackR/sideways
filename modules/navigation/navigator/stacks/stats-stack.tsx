import { Statistics } from '@upward/stats';
import { NavigableRoute } from '../routes';

export const StatsStackNavigator = [
  {
    name: NavigableRoute.STATS_MAIN as string,
    component: Statistics,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.STATS_MILES as string,
    component: Statistics,
    options: { headerShown: false },
  },
  {
    name: NavigableRoute.STATS_BADGES,
    component: Statistics,
    options: { headerShown: false },
  },
];
