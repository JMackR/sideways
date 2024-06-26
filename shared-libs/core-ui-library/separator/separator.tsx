import { FC } from 'react';
import { useColorForBackgroundColor } from '@upward/themes';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SeparatorProps } from './separator.props';

/**
 * A thin horizontal separator
 */
export const Separator: FC<SeparatorProps> = ({ direction, id }) => {
  let width: string | number = '100%';
  let height: string | number = 1;
  if (direction === 'row') {
    width = 1;
    height = '100%';
  }
  const style: ViewStyle = {
    width,
    height,
    borderBottomColor: useColorForBackgroundColor('onBackground'),
    borderLeftColor: useColorForBackgroundColor('onBackground'),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
  };

  return <View key={id} style={style} testID={'separator'} />;
};
