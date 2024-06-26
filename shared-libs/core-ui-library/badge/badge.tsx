import { useColorForBackgroundColor } from '@upward/themes';
import { ms } from '@upward/utilities';
import { PixelRatio, StyleSheet, View } from 'react-native';
import { Text } from '../text';
import { BadgeProps } from './badge-props';
import { truncateAmount } from './badge.common';
import { getFontScale } from 'react-native-device-info';

export const Badge = (props: BadgeProps) => {
  const BADGE_SIZE = ms(22);
  const BADGE_CORNER_RADIUS = BADGE_SIZE / 2;
  const WIDTH_MULTIPLIER = 0.53;
  const truncated = truncateAmount(props.amount);
  const { testID, showBorder } = props;
  const shouldDisplay = truncated.length > 0;
  const badgeWidth = truncated.length > 1 ? truncated.length * WIDTH_MULTIPLIER * BADGE_SIZE : BADGE_SIZE;
  const background = useColorForBackgroundColor('error');

  const BadgeStyles = StyleSheet.create({
    container: {
      borderRadius: BADGE_CORNER_RADIUS,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: badgeWidth,
      height: BADGE_SIZE,
      top: 0,
      left: 0,
      backgroundColor: background,
      borderColor: '#fff',
      borderWidth: showBorder ? 1 : 0,
    },
  });

  if (shouldDisplay) {
    return (
      <View style={BadgeStyles.container} testID={testID || 'text-badge'} accessibilityLabel={testID || 'text-badge'}>
        <View style={{ top: PixelRatio.getFontScale() > 1.0 ? -2 : 0 }}>
          <Text textType="bodyMedium3" textAlign="center" color="onError" testID="text-badge.amount">
            {truncated}
          </Text>
        </View>
      </View>
    );
  }
  return <View />;
};
