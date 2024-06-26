import React from 'react';
import { View, StyleSheet } from 'react-native';
import { shadow, useColorForBackgroundColor } from '@upward/themes';
import { BackgroundProps } from './background-container-props';

export const BackgroundContainer: React.FunctionComponent<BackgroundProps> = (props) => {
  const { type, style, topRadiusOnly, borderRadius, borderColor, showShadow = false, children, testID } = props;
  const color = useColorForBackgroundColor(type || 'primary');
  const colorBorder = useColorForBackgroundColor(borderColor || 'clear');
  const border = borderColor ? colorBorder : undefined;
  const applyShadow = showShadow ? { ...shadow.screenShadow } : undefined;

  const STYLES = StyleSheet.create({
    container: {
      backgroundColor: color,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: topRadiusOnly ? 10 : borderRadius,
      borderBottomLeftRadius: topRadiusOnly ? 10 : borderRadius,
      borderColor: border,
      borderWidth: borderColor ? 1 : 0,
      ...applyShadow,
    },
  });


  return (
    <View style={[STYLES.container, style]} testID={testID} accessibilityLabel={testID}>
      {children}
    </View>
  );
};
