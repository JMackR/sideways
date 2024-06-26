import {
  Background,
  BackgroundContainer,
  Button,
  Margin,
  SVG,
  Separator,
  Stack,
  Text,
  Touchable,
} from '@upward/core-ui-library';

import { RunnerIcon, StepsIcon, AwardIcon, StatsIcon } from '@upward/assets';
import { MilesStat } from './miles-stat';
import { PersonalBestStat } from './personal-best';
import { StepsStat } from './steps';

const stats = { period: 'June', miles: 29.3, steps: '11,874', records: 3 };

export const Highlights = () => {
  return (
    <Margin marginStep={2}>
      <Margin grow={1} direction="row" marginBottomStep={4}>
        <Margin grow={1} direction="column" crossAxisDistribution="flex-start">
          <Text textType="headerBold2" color={'primary'}>
            {`${stats.period} Highlights`}
          </Text>
        </Margin>
        <Margin grow={1} direction="column" crossAxisDistribution="flex-end">
          <Button
            title="View all Stats"
            titleColor="brand"
            onPress={() => console.log('click me')}
            leftIcon={StatsIcon}
            tint={'brand'}
            buttonSize="small"
            buttonType="text"
          />
        </Margin>
      </Margin>
      <Stack grow={0} direction="row" childSeparationStep={4}>
        <Margin grow={1} width={'40%'}>
          <MilesStat stats={stats} />
        </Margin>
        <Margin grow={1} width={'40%'}>
          <StepsStat stats={stats} />
        </Margin>
      </Stack>
      <Margin marginTopStep={4}>
        <PersonalBestStat stats={stats} />
      </Margin>
      <Margin marginStep={4}>
        <Separator direction="column" />
      </Margin>
    </Margin>
  );
};
