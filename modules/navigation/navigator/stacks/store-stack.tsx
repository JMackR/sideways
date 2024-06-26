import { NavigableRoute } from '@upward/navigation';
import { Store } from '@upward/shop';

export const StoreStackNavigator = [
  {
    name: 'STORE_STACK',
    component: Store,
    options: { headerShown: false },
  },
];
