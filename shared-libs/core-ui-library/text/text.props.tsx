import { TextColors, TextTypes } from '@upward/themes';
import React from 'react';
import { GestureResponderEvent } from 'react-native';
export interface TextProps {
  /**
   * Style to be used for the text's display
   */
  textType?: keyof TextTypes;

  /**
   * Color of the text to be used
   * @default: primary1
   */
  color?: keyof TextColors;

  /**
   * The text to be displayed
   * Can also render multiple Text children if needed, such as for links that are displayed inline.
   */
  children?: React.ReactNode;

  /**
   * The ID to use for this text field for testing
   */
  testID?: string | undefined;

  /**
   * The alignment of this text within its parent.  Defaults to left.
   */
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';

  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';

  /**
   * Indicates the max number of lines.  If text goes beyond the maximum size, it ellipsizes.
   */
  numberOfLines?: number;

  /**
   * allows users to select and copy text
   */
  selectable?: boolean;
  /**
   * Action performed when the text is pressed
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Callback for the underlying Text's onTextLayout callback
   */
  onTextLayout?: (event: { nativeEvent: { lines: [] } }) => void;

  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;

  dropShadow?: boolean;

  maxFontSizeMultiplier?: number;
}
