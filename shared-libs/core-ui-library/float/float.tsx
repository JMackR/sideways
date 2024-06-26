import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useMargin } from '@upward/themes';
import { FloatProps } from './float-props';
import invariant from 'invariant';

const getInset = (baseMargin: number, insetStep?: number) => {
  if (insetStep) {
    return insetStep * baseMargin;
  }
  return insetStep;
};

export const Float: React.FC<FloatProps> = (props) => {
  const {
    children,
    insetLeftStep,
    insetBottomStep,
    insetRightStep,
    insetTopStep,
    debugColor,
    width,
    height,
    axisDistribution,
    crossAxisDistribution,
    basis,
    grow,
    shrink,
    direction,
    testID,
  } = props;

  invariant(React.Children.count(children) > 0, 'FLoat requires children');

  const { baseMargin } = useMargin();

  const styles = StyleSheet.create({
    float: {
      position: 'absolute',
      top: getInset(baseMargin, insetTopStep),
      bottom: getInset(baseMargin, insetBottomStep),
      left: getInset(baseMargin, insetLeftStep),
      right: getInset(baseMargin, insetRightStep),
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
    },
  });
  return (
    <View style={styles.float} testID={testID} accessibilityLabel={testID}>
      {children}
    </View>
  );
};
