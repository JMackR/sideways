import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = PropsWithChildren<{
  collapsed: boolean;
  style?: ViewStyle;
}>;

export const Collapsible: FunctionComponent<Props> = ({ collapsed, children, style }) => {
  const shareValue = useSharedValue(0);
  const [bodySectionHeight, setBodySectionHeight] = useState<any>(null);

  const bodyHeight = useAnimatedStyle(() => ({
    height: interpolate(shareValue.value, [0, 1], [0, bodySectionHeight ?? 0]),
    opacity: interpolate(shareValue.value, [0, 1], [0, 1]),
  }));

  const toggleCollapsed = useCallback(
    (collapsed: boolean) => {
      const nextValue = collapsed ? 0 : 1;

      shareValue.value = withTiming(nextValue, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    },
    [shareValue],
  );

  useEffect(() => {
    toggleCollapsed(collapsed);
  }, [collapsed, toggleCollapsed]);

  return (
    <Animated.View style={[{ overflow: 'hidden' }, bodyHeight]}>
      <View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
          style,
        ]}
        onLayout={(event) => {
          setBodySectionHeight(event.nativeEvent.layout.height);
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
};
