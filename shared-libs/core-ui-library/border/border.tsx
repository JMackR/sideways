import React, { useState } from 'react';
import { useBorder, useColorForBackgroundColor } from '@upward/themes';
import { View, TouchableWithoutFeedback, StyleSheet, LayoutChangeEvent } from 'react-native';

import { BorderProps } from './border.d';

export const Border: React.FunctionComponent<BorderProps> = (props) => {
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
    color,
    cornerRadius,
    lineWeight,
    hidden,
    borderType,
    touchUpInsideHandler: touchUpInside,
  } = props;

  const [size, setSize] = useState({ height: 0, width: 0 });
  const { baseBorder } = useBorder();

  let borderRadius;
  switch (cornerRadius) {
    case 'small':
      borderRadius = baseBorder.cornerRadius.small;
      break;
    case 'large':
      borderRadius = baseBorder.cornerRadius.large;
      break;
    case 'circle':
      borderRadius = Math.min(size.height, size.width) / 2;
      break;

    default:
      borderRadius = 0;
  }
  let borderWidth;
  switch (lineWeight) {
    case 'heavy':
      borderWidth = baseBorder.lineWeight.heavy;
      break;
    case 'none':
      borderWidth = 0;
      break;
    case 'light':
      borderWidth = 1;
      break;
    default:
      borderWidth = baseBorder.lineWeight.light;
  }
  const useBackgroundColor = useColorForBackgroundColor(color);

  let borderColor;
  if (hidden) {
    borderColor = 'transparent';
  } else {
    borderColor = useBackgroundColor;
  }

  const styles = StyleSheet.create({
    border: {
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
      overflow: 'hidden',
      borderStyle: borderType,
      borderRadius,
      borderWidth,
      borderColor,
    },
  });

  const wrapChildren = () => {
    if (touchUpInside) {
      return (
        <TouchableWithoutFeedback onPressOut={touchUpInside} testID="border-press">
          <View style={{ flex: 1 }}>
            <>{children}</>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return children;
  };

  const onLayout = (e: LayoutChangeEvent) => {
    setSize({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  return (
    <View style={styles.border} onLayout={onLayout} testID="border-view">
      {wrapChildren()}
    </View>
  );
};
