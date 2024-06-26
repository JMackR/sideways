import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LayoutContainerProps } from '../container-props';

export const Flex: React.FunctionComponent<LayoutContainerProps> = (props) => {
  const {
    debugColor,
    width,
    height,
    axisDistribution,
    crossAxisDistribution,
    basis,
    grow,
    shrink,
    direction,
    children,
    testID,
    touchUpInsideHandler,
    overflow,
    style,
  } = props;

  const styles = StyleSheet.create({
    flex: {
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
      overflow,
    },
  });

  return (
    <View style={[styles.flex, style]} onTouchEnd={touchUpInsideHandler} testID={testID}>
      {children}
    </View>
  );
};
