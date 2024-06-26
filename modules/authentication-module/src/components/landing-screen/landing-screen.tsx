const data = [
  {
    id: 1,
    image: require('../images/image1.png'),
    title: 'Take your running or walking journey to another level',
    text: "Our proven training plans meet your where you are and help you achieve goals you are striving for or can't even imagine today.",
  },
  {
    id: 2,
    image: require('../images/image2.png'),
    title: 'More than 14 years of encouraging and guiding people just like you',
    text: 'There have been over 250,000 graduates of our programs, that is quite a track record of success.',
  },
  {
    id: 3,
    image: require('../images/image3.png'),
    title: 'More than just training plans',
    text: 'Track your runs, get audible coaching in your runs or walks, learn how to safely start or improve in the sport, grow personally through weekly Biblical teachings.',
  },
  {
    id: 4,
    image: require('../images/image3.png'),
    title: 'Join the community and get involved',
    text: 'There is more than just running and walking going on here. Our communities are here to encourage, support, lift up, and be with you every step of your journey.',
  },
];
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import Pagination from './landing-pagination';
import CustomButton from './landing-button';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LandingScreen = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef<any>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({ viewableItems }) => {
    flatListIndex.value = viewableItems[0].index;
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = ({ item, index }) => {
    const imageAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
        [0, 1, 0],
        Extrapolation.CLAMP,
      );
      const translateYAnimation = interpolate(
        x.value,
        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
        [100, 0, 100],
        Extrapolation.CLAMP,
      );
      return {
        opacity: opacityAnimation,
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        transform: [{ translateY: translateYAnimation }],
      };
    });
    const textAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
        [0, 1, 0],
        Extrapolation.CLAMP,
      );
      const translateYAnimation = interpolate(
        x.value,
        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
        [100, 0, 100],
        Extrapolation.CLAMP,
      );

      return {
        opacity: opacityAnimation,
        transform: [{ translateY: translateYAnimation }],
      };
    });
    return (
      <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
        <Animated.Image source={item.image} style={imageAnimationStyle} />
        <Animated.View style={textAnimationStyle}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemText}>{item.text}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} screenWidth={SCREEN_WIDTH} />
        <CustomButton flatListRef={flatListRef} flatListIndex={flatListIndex} dataLength={data.length} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E9B0',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8E9B0',
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  itemText: {
    textAlign: 'center',
    marginHorizontal: 35,
    color: 'black',
    lineHeight: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});
