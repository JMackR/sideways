import React from 'react';
import { useMargin } from '@upward/themes';
import invariant from 'invariant';
import { View, StyleSheet } from 'react-native';
import { OverlayProps } from './overlay-props';

const getInset = (baseMargin: number, insetStep?: number) => {
  if (insetStep) {
    return insetStep * baseMargin;
  }
  return insetStep;
};

export const Overlay: React.FC<OverlayProps> = (props) => {
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
  invariant(React.Children.count(children) > 0, 'Overlay requires children');

  const { baseMargin } = useMargin();

  const styles = StyleSheet.create({
    overlay: {
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
    <View style={styles.overlay} testID={testID || 'overlay-component'} accessibilityLabel={testID}>
      {children}
    </View>
  );
};
