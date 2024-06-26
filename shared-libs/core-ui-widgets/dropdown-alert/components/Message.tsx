// @ts-nocheck

import React from 'react';
import { TextStyle, Text, StyleSheet, TextProps } from 'react-native';

export interface MessageProps extends TextProps {
  value?: String;
  color?: String;
  style?: TextStyle;
}

export default function Message(props?: MessageProps) {
  const { value, color, style, ...otherProps } = props;
  return (
    <Text {...otherProps} style={[styles.title, { color }, style]}>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 2,
  },
});
