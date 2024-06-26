import { Background, LocalSVGSource, Margin, SVG, Separator, Text } from '@upward/core-ui-library';
import { TrophyIcon } from '@upward/assets';

type Icon = {
  [key: string]: string;
};
const icons = {
  trophy: TrophyIcon,
};
const trackerData = { message: 'Keep up the good work. Half way to earning your Couch To 5K badge!', icon: 'trophy' };

export const BadgeTracker = () => {
  return (
    <Margin>
      <Margin direction="column">
        <Background borderRadius={5} type={'info'} />
        <Margin direction="row" marginStep={4}>
          <Margin direction="column" grow={1} width={'50%'}>
            <Margin marginBottomStep={2}>
              <Text textType="headerMedium1" color={'primary'}>
                Badge Tracker
              </Text>
            </Margin>
            <Margin marginBottomStep={2} wrap={true}>
              <Text textType="bodyRegular1" color={'primary'}>
                {trackerData.message}
              </Text>
            </Margin>
          </Margin>
          {trackerData.icon && (
            <Margin grow={1} direction="column" crossAxisDistribution="flex-end">
              <SVG
                tint={'brand'}
                localSVG={{
                  SVG: icons[trackerData.icon as Icon].SVG as LocalSVGSource,
                  size: { width: 80, height: 80 },
                }}
              />
            </Margin>
          )}
        </Margin>
      </Margin>
      <Margin marginStep={4}>
        <Separator direction="column" />
      </Margin>
    </Margin>
  );
};
