import { ColorTheme } from '@upward/themes';
import { StyleProp, View, ViewStyle } from 'react-native';

export type ActivityIndicatorProps = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Whether to show the indicator or hide it.
   */
  animating?: boolean;
  /**
   * The color of the spinner.
   */
  color?: string;
  /**
   * Size of the indicator.
   */
  size?: 'small' | 'large' | number;
  /**
   * Whether the indicator should hide when not animating.
   */

  hidesWhenStopped?: boolean;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */

  theme?: ColorTheme;
  testID?: string;
};
