import { useColorForTextColor, useFontForTextType } from '@upward/themes';
import { shadow } from '@upward/themes/shadow';
import React from 'react';
import { Text as RNText } from 'react-native';
import { TextProps } from './text.props';

export const Text: React.FunctionComponent<TextProps> = (props) => {
  const {
    numberOfLines,
    children,
    textType,
    textAlign,
    textDecorationLine,
    onPress,
    testID,
    selectable,
    color: textColor,
    ellipsizeMode,
    maxFontSizeMultiplier = 4.25,
    dropShadow,
  } = props;

  const font = useFontForTextType(textType || 'bodyRegular2');
  const color = useColorForTextColor(textColor || 'primary');
  const textShadow = dropShadow ? shadow.shadow : undefined;

  return (
    <RNText
      style={[font, { color, textAlign, textDecorationLine }, textShadow]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
      selectable={selectable}
      testID={testID || 'text'}
      accessibilityRole={'text'}
      accessibilityLabel={testID || 'text'}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
    >
      {children}
    </RNText>
  );
};
