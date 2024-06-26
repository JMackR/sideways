import { NativeTouchEvent } from 'react-native';
import { TextColors, TextTypes } from 'shared/themes';
import { RemoteImageSource } from '../remote-image-source';

export interface AvatarProps {
  source?: RemoteImageSource;

  size: number;

  children?: React.ReactNode;

  isAutosDealer?: boolean;

  onPress?(event: NativeTouchEvent): void;

  borderColor?: string;

  borderWidth?: number;

  label?: string;

  textType?: keyof TextTypes;

  textColor?: keyof TextColors;

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}
