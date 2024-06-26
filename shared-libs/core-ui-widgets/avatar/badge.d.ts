import {
  LocalSVGSource,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';

export interface BadgeProps extends ViewProps, TouchableOpacityProps {
  children?: React.ReactNode;
  /**
   * Text to show inside the badge.
   * Not passing a label (undefined) will present a pimple badge.
   */
  label?: string;
  iconTint?: string;
  /**
   * Color of the badge background
   */
  backgroundColor?: string;
  /**
   * the badge size
   */
  size?: number;
  /**
   * Press handler
   */
  onPress?: (props: any) => void;
  /**
   * Defines how far a touch event can start away from the badge.
   */
  hitSlop?: ViewProps['hitSlop'];
  /**
   * width of border around the badge
   */
  borderWidth?: number;
  /**
   * radius of border around the badge
   */
  borderRadius?: number;
  /**
   * color of border around the badge
   */
  borderColor?: ImageStyle['borderColor'];
  /**
   * Additional styles for the top container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional styles for the badge label
   */
  labelStyle?: TextStyle;
  /**
   * Receives a number from 1 to 4, representing the label's max digit length.
   * Beyond the max number for that digit length, a "+" will show at the end.
   * If set to a value not included in LABEL_FORMATTER_VALUES, no formatting will occur.
   * Example: labelLengthFormater={2}, label={124}, label will present "99+".
   */
  labelFormatterLimit?: number;
  /**
   * Renders an icon badge
   */
  icon?: LocalSVGSource;
  /**
   * Additional styling to badge icon
   */
  iconStyle?: object;
  /**
   * Additional props passed to icon
   */
  iconProps?: object;
  /**
   * Custom element to render instead of an icon
   */
  customBadge?: JSX.Element;
  /**
   * Additional styles for the badge itself
   */
  style?: StyleProp<ViewStyle>;
}
