import React from 'react';
import {
  AccessibilityProps,
  ImagePropsBase,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageProps,
} from 'react-native';
import { LocalSVGSource } from '../..';
import { TextTypes } from '../../../themes';
import { AutoColorsProps, BadgePosition } from './avatar';
import { BadgeProps } from './badge.d';

interface AvatarSize {
  large: string;
  medium: string;
  small: string;
  custom: string;
  xsmall: string;
}
export interface AvatarProps extends AccessibilityProps {
  children?: React.ReactNode;
  name?: string;
  avatarSize?: number;
  imageProps?: ImageSourcePropType;
  forwardedRef?: React.ForwardedRef<HTMLUListElement>;
  /**
   * Adds fade in animation when Avatar image loads
   */
  animate?: boolean;
  /**
   * Background color for Avatar
   */
  backgroundColor?: string;
  /**
   * Badge location on Avatar
   */
  badgePosition?: BadgePosition;
  /**
   * Badge props passed down to Badge component
   */
  badgeProps?: BadgeProps | undefined;
  /**
   * Additional spacing styles for the container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * The image source (external or assets)
   */
  source?: string;
  /**
   * The Avatar size
   */
  imageSize?: keyof AvatarSize | number;
  /**
   * Image style object used to pass additional style props
   * by components which render image
   */
  imageStyle?: ImageStyle;
  /**
   * Listener-callback for when an image's (uri) loading
   * starts (equiv. to Image.onLoadStart()).
   */
  onImageLoadStart?: ImagePropsBase['onLoadStart'];
  /**
   * Listener-callback for when an image's (uri) loading
   * either succeeds or fails (equiv. to Image.onLoadEnd()).
   */
  onImageLoadEnd?: ImagePropsBase['onLoadEnd'];
  /**
   * Listener-callback for when an image's (uri) loading
   * fails (equiv. to Image.onError()).
   */
  onImageLoadError?: ImagePropsBase['onError'];
  /**
   * The name of the avatar user.
   * If no label is provided, the initials will be generated from the name.
   * autoColorsConfig will use the name to create the background color of the Avatar.
   */
  name?: string;
  /**
   * Hash the name (or label) to get a color, so each name will have a specific color.
   * Default is false.
   */
  useAutoColors?: boolean;
  /**
   * Send this to use the name to infer a backgroundColor
   */
  autoColorsConfig?: AutoColorsProps;
  /**
   * Label that can represent initials
   */
  label?: string;
  /**
   * The label color
   */
  labelColor?: string;
  /**
   * ribbon label to display on the avatar
   */
  ribbonLabel?: string;
  /**
   * ribbon custom style
   */
  ribbonStyle?: StyleProp<ViewStyle>;
  /**
   * ribbon label custom style
   */
  ribbonLabelStyle?: StyleProp<TextStyle>;
  /**
   * Custom ribbon
   */
  customRibbon?: JSX.Element;
  /**
   * Custom size for the Avatar
   */
  size?: number;
  /**
   * Press handler
   */
  onPress?: (props: any) => void;
  /**
   * Used as a testing identifier
   */
  testID?: string;

  svgSource?: LocalSVGSource;
}

export interface AvatarGroupProps extends Omit<AvatarProps, 'imageSource'> {
  /**
   * The distance each avatar.
   */
  space?: number;
  /**
   * The max number of avatar.
   */
  max?: number;
  /**
   * The list of images.
   */
  images: ImageSourcePropType[];

  ribbontextType?: keyof TextTypes;
}
