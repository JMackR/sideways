import { Button, Margin, Text } from '@upward/core-ui-library';
import { EncouragementCard } from './encouragement-card';
import { Carousel } from '@upward/core-ui-widgets';
import { RightArrowIcon } from '@upward/assets';

const plans = [
  {
    description: 'New Heart',
    imageURL: `https://picsum.photos/400/300?t=${new Date().getTime()}`,
    podCastID: 1,
    action: () => console.log('hi bob'),
  },
  {
    description: 'BOB NewHart',
    imageURL: `https://picsum.photos/400/300?t=${new Date().getTime()}`,
    podCastID: 2,
    action: () => console.log('hi bob'),
  },
];

export const Encouragement = () => {
  return (
    <Margin>
      <Margin grow={1} direction="row" axisDistribution="center" crossAxisDistribution="center" marginBottomStep={4}>
        <Margin grow={1} direction="column" crossAxisDistribution="flex-start">
          <Text textType="headerBold2" color={'primary'}>
            Weekly Encouragment
          </Text>
        </Margin>
        <Margin grow={1} direction="column" crossAxisDistribution="flex-end">
          <Button
            title="View all"
            onPress={() => console.log('click me')}
            rightIcon={RightArrowIcon}
            tint={'primary'}
            buttonSize="medium"
            buttonType="text"
          />
        </Margin>
      </Margin>
      <Carousel options={plans} card={EncouragementCard} height={350} showButtons={true} showsPagination={false} />
    </Margin>
  );
};
