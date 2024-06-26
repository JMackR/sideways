import { BackgroundColors, TextColors } from '@upward/themes';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface DropdownProps {
  items: Array<any>;
  setItems?: () => {};
  value?: null;
  setValue?: null;
  placeholder?: string;
  title?: string;
  testID: string;
  background: keyof BackgroundColors;
  color: keyof TextColors;
}
