import React from 'react';
import { Dimensions, View, ViewStyle, ScrollViewProps } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { Text, Touchable } from '@upward/core-ui-library';
import TabPage from './TabPage';

const { width } = Dimensions.get('window');

export type PageProps = {
  key: string;
  title: string;
};

interface TabViewProps<T extends PageProps> {
  renderPages: (props: { route: T }) => React.ReactNode;
  pages: T[];
  containerStyle?: ViewStyle;
  pageStyle?: ViewStyle;
}

export const TabView = <T extends PageProps>({
  renderPages,
  pages,
  containerStyle = {},
  pageStyle,
  ...rest
}: TabViewProps<T> & ScrollViewProps) => {
  const HEADER_MARGIN = 12;
  const HEADER_ITEM_WIDTH = width / pages.length - HEADER_MARGIN;

  const scrollView = useAnimatedRef<Animated.ScrollView>();
  const selectedPage = useSharedValue(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const translationX = useSharedValue(0);

  useAnimatedReaction(
    () => selectedPage,
    (newIndex) => {
      runOnJS(setCurrentPage)(newIndex.value);
    },
  );

  const onScroll = useAnimatedScrollHandler((e) => {
    const offsetX = e.contentOffset.x;
    const index = Math.round((offsetX / (width * pages.length)) * pages.length);

    translationX.value = withTiming(index * 95);
    selectedPage.value = index;
  });

  const jumpTo = (index: number) => {
    scrollView.current?.scrollTo({
      y: 0,
      x: index * width,
      animated: true,
    });
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value + 5 }],
  }));

  return (
    <View style={[containerStyle, { flex: 1 }]}>
      <View style={{ backgroundColor: 'white' }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'nowrap',
            paddingHorizontal: HEADER_MARGIN,
            paddingVertical: 6,
            backgroundColor: 'white',
          }}
        >
          {pages.map((route, index) => {
            return (
              <Touchable onPress={() => jumpTo(index)} key={route.key} style={{ width: 110 }}>
                <Text color={currentPage === index ? 'primary' : 'onSecondary'} textType="bodyMedium1">
                  {route.title}
                </Text>
              </Touchable>
            );
          })}
        </View>
        <Animated.View
          style={[
            indicatorStyle,
            {
              backgroundColor: '#00BDED',
              height: 4,
              borderRadius: 2,
              width: HEADER_ITEM_WIDTH / 3,
              marginHorizontal: HEADER_MARGIN,
            },
          ]}
        />
      </View>
      <Animated.ScrollView
        ref={scrollView}
        horizontal
        scrollEnabled
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        {...rest}
      >
        {pages.map((route, index) => (
          <TabPage
            index={index}
            width={width}
            currentIndex={currentPage}
            lazy
            lazyPreloadDistance={0}
            style={[{ width, backgroundColor: 'white' }, pageStyle]}
          >
            {({ loading }) =>
              loading ||
              renderPages({
                route,
              })
            }
          </TabPage>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

class PageComponent<T extends { component: React.ComponentType<any> }> extends React.PureComponent<T> {
  render() {
    const { component, ...rest } = this.props;
    return React.createElement(component, rest);
  }
}

export function PageMap<T extends any>(scenes: { [key: string]: React.ComponentType<T> }) {
  return ({ route }: { route: any }) => <PageComponent key={route.key} component={scenes[route.key]} route={route} />;
}
