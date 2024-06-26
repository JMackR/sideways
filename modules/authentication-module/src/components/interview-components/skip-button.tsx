import { Margin, Text } from '@upward/core-ui-library';
import { useScale } from '@upward/utilities';
import { useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

export const SkipButton = () => {
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();
  const { ms } = useScale(dimensions);

  return (
    <Margin direction="column" axisDistribution="center">
      <Margin shrink={0} direction="column" crossAxisDistribution="center" marginBottomStep={2}>
        <Text textType="headerMedium1" color="primary" textAlign="center">
          Skip button
        </Text>
      </Margin>
    </Margin>
  );
};