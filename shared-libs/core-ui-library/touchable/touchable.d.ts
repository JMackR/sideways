import type { NativeTouchEvent, ViewStyle } from 'react-native';
import type { TouchableCommonProps } from './touchable.common';

export interface TouchableProps extends TouchableCommonProps {
  /* Define style in native apps */
  style?: ViewStyle;

  onPress?(event: GestureResponderEvent): void;
  children: React.ReactNode;
  disabled?: boolean;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}
