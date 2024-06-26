import { NavigationBar, NavigationBarProps, Screen } from '@upward/core-ui-widgets';
import { useRef } from 'react';
import { FlatList } from 'react-native';
import Layout from './layoutConfig.json';
import { Margin, Text } from '@upward/core-ui-library';

const components = {
  plan: Pod,
  highlights: Highlights,
  bible: DailyBible,
  badge: BadgeTracker,
  encouragement: Encouragement,
};
import Mapbox from '@rnmapbox/maps';
import { LogoIcon } from '@upward/assets';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Pod } from './pod';
import { Highlights } from './highlights';
import { DailyBible } from './daily-bible';
import { BadgeTracker } from './badge-tracker';
import { Encouragement } from './encouragment';
import { NavigableRoute } from '@upward/navigation';
dayjs.extend(customParseFormat);

Mapbox.setAccessToken('pk.eyJ1IjoianJleW5vbGRzNjciLCJhIjoiY2x4Mjhwbm4zMGVzeTJqcTEzdm9wbDF5ZCJ9.93xvC_UKzFBuRpvV5frNwA');
export const Dashboard = () => {
  const navigation = useNavigation<any>();

  const listRef = useRef(null);

  const pressMe = async () => {
    console.log('press me');
    navigation.navigate(NavigableRoute.PROFILE_MAIN);
  };
  const rightItems = [
    { avatar: true, name: 'JIM BOBBBBBBBB', imageUrl: 'https://picsum.photos/id/237/200/300', pressHandler: pressMe },
  ];
  const leftItems = [{ title: dayjs().format('ddd D MMM'), icon: LogoIcon }];
  const navigationBarProps: NavigationBarProps = {
    testID: 'home-screen.navigation-bar',
    barItemsTint: 'secondary',
    isRootNavBar: false,
    isMain: true,
    rightItems: rightItems,
    leftItems: leftItems,
  };

  const renderComponents =
    (Components: any) =>
      ({ item }: { item: any }) => {
        const Section = Components[item['component']];
        return <Section {...item} />;
      };
  return (
    <Screen safeAreaMode="top" screenName={'Home_Screen'}>
      <NavigationBar {...navigationBarProps} />
      <Margin marginLeftStep={2} marginRightStep={2}>
        <Margin crossAxisDistribution="flex-start">
          <Text textType={'headerBold2'} color={'brand'}>
            My Dashboard
          </Text>
        </Margin>
        <FlatList
          ref={listRef}
          scrollEventThrottle={16}
          data={Layout}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 200 }}
          keyExtractor={(item, index) => `${item.component}-${index}`}
          renderItem={renderComponents(components)}
        />
      </Margin>
    </Screen>
  );
};
