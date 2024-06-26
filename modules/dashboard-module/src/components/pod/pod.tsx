import { Margin, SVG, Separator, Text, Touchable } from '@upward/core-ui-library';
import { PodCard } from './pod-card';
import { Carousel } from '@upward/core-ui-widgets';
import { ChangeIcon, ManageIcon, SearchIcon } from '@upward/assets';

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

const actionHandlers = [
  {
    icon: SearchIcon,
    text: 'View Plan',
    onPress: () => {
      console.log('hi bob');
    },
  },
  {
    icon: ManageIcon,
    text: 'Manage Plan',
    onPress: () => {
      console.log('hi bob');
    },
  },
  {
    icon: ChangeIcon,
    text: 'Change Plan',
    onPress: () => {
      console.log('hi bob');
    },
  },
];

export const Pod = () => {
  return (
    <Margin>
      <Carousel
        options={plans}
        card={PodCard}
        height={275}
        showButtons={true}
        showsPagination={false}
        buttonWrapperStyle={{ marginTop: 20 }}
      />
      <Margin direction="row" axisDistribution="center">
        {actionHandlers.map((action) => {
          return (
            <Touchable onPress={action.onPress}>
              <Margin
                direction="column"
                crossAxisDistribution="center"
                wrap={true}
                axisDistribution="flex-start"
                marginLeftStep={1}
                marginRightStep={1}
              >
                <Margin axisDistribution="center" marginStep={1}>
                  <SVG
                    tint={'brand'}
                    localSVG={{
                      SVG: action.icon.SVG,
                      size: { width: 20, height: 20 },
                    }}
                  />
                </Margin>
                <Margin axisDistribution="center" marginStep={1} width={'75%'}>
                  <Text textType={'bodyMedium1'} color={'primary'} textAlign="center">
                    {action.text}
                  </Text>
                </Margin>
              </Margin>
            </Touchable>
          );
        })}
      </Margin>
      <Margin marginStep={4}>
        <Separator direction="column" />
      </Margin>
    </Margin>
  );
};
