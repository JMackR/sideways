import React from 'react';
import { useMargin } from '@upward/themes';
import { LayoutChangeEvent, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import { ScrollViewProps } from './scroll-view-props';

interface Size {
  width: number;
  height: number;
}

interface ScrollViewNativeProps extends ScrollViewProps {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  contentContainerStyle?: any;
}

/**
 * This component wraps a ScrollView and only enables scrolling when the size of its children grows beyond the ScrollView's bounds.
 */
export const ScrollView: React.FC<ScrollViewNativeProps> = (props) => {
  const {
    children,
    horizontal,
    disableFlexGrowContentWhenNotScrolling = false,
    bottomContentInsetStep,
    testID,
    contentContainerStyle,
    onScroll,
  } = props;
  let { onlyScrollsWhenNeeded } = props;
  if (onlyScrollsWhenNeeded === undefined) {
    onlyScrollsWhenNeeded = true;
  }
  const [contentContainerSize, setContentContainerSize] = React.useState<Size>({
    width: 0,
    height: 0,
  });
  const [scrollViewSize, setScrollViewSize] = React.useState<Size>({
    width: 0,
    height: 0,
  });
  const { baseMargin } = useMargin();
  const calculatedBottomInset = baseMargin * (bottomContentInsetStep || 0);

  const handleContentSizeDidChange = (contentWidth: number, contentHeight: number) => {
    setContentContainerSize({ width: contentWidth, height: contentHeight });
  };

  const handleScrollViewLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setScrollViewSize({ width, height });
  };

  const contentHeightIsTooBig = scrollViewSize.height < contentContainerSize.height;
  const contentWidthIsTooBig = scrollViewSize.width < contentContainerSize.width;
  const scrollEnabledBecauseOfContentSize = horizontal ? contentWidthIsTooBig : contentHeightIsTooBig;
  const scrollEnabled = onlyScrollsWhenNeeded ? scrollEnabledBecauseOfContentSize : true;

  const flexGrow = disableFlexGrowContentWhenNotScrolling ? (scrollEnabled ? 0 : 1) : undefined;

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      nestedScrollEnabled
      contentContainerStyle={{ flexGrow, ...contentContainerStyle }}
      contentInset={{ bottom: calculatedBottomInset }}
      horizontal={horizontal}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onLayout={handleScrollViewLayout}
      onContentSizeChange={handleContentSizeDidChange}
      testID={testID || 'scroll-view'}
      accessibilityLabel={testID || 'scroll-view'}
      scrollEventThrottle={16}
    >
      {children}
    </Animated.ScrollView>
  );
};
