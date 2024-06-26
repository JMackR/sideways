import GroupScreen from '@upward/groups';
import { NavigableRoute } from '@upward/navigation';

export const GroupsStackNavigator = [
  {
    name: 'GROUPS_STACK',
    component: GroupScreen,
    options: { headerShown: false },
  },
];
