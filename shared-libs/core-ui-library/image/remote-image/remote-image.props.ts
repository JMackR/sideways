import { BackgroundColors } from '@upward/themes/type-defs';
import type { ResizeMode } from '../image-props';
import type { RemoteImageSource } from '../remote-image-source';

export interface RemoteImageProps {
  resizeMode: ResizeMode;
  source: RemoteImageSource | string;
  avatarSize?: string;
  badgeProps?: string[];
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: keyof BackgroundColors;
  backgroundColor?: keyof BackgroundColors;
  children?: React.ReactNode;
  label?: string;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}
