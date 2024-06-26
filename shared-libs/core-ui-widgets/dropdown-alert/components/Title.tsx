// @ts-nocheck
import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';

export interface TitleProps extends TextProps {
  value?: String;
  color?: String;
  style?: TextStyle;
}

export default function Title(props?: TitleProps) {
  const { value, color, style, ...otherProps } = props;
  return (
    <Text {...otherProps} style={[styles.title, { color }, style]}>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    lineHeight: 20,
  },
});
