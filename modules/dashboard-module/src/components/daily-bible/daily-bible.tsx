import { Margin, SVG, Separator, Text, Touchable } from '@upward/core-ui-library';

import { Carousel } from '@upward/core-ui-widgets';
import { ChangeIcon, ManageIcon, SearchIcon } from '@upward/assets';
import { BibleCard } from './bible-card';

const plans = [
  {
    isCurrentPlan: true,
    planProgress: 0.5,
    planTitle: 'Couch to 5k Walker Training Plan',
    description: 'Walk 2 miles',
    time: '30 mins',
    imageURL: `https://picsum.photos/400/300?t=${new Date().getTime()}`,
    planID: 1,
  },
  {
    isCurrentPlan: null,
    planProgress: null,
    planTitle: 'Couch to 10k Walker Training Plan',
    description: 'Walk 5 miles',
    time: '60 mins',
    imageURL: `https://picsum.photos/400/300?t=${new Date().getTime()}`,
    planID: 2,
  },
];

export const DailyBible = () => {
  return (
    <Margin>
      <Margin axisDistribution="center" marginStep={1} width={'75%'}>
        <Text textType="headerBold2" color={'primary'}>
          365 Bible
        </Text>
      </Margin>
      <Carousel options={plans} card={BibleCard} height={300} showButtons={true} showsPagination={false} />
      <Margin marginStep={4}>
        <Separator direction="column" />
      </Margin>
    </Margin>
  );
};
