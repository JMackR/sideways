import { SceneMap, Screen, TabView } from '@upward/core-ui-widgets';
import { View, useWindowDimensions } from 'react-native';
import { PersonalStats } from './personal-stats';
import { History } from './history';
import { useState } from 'react';

const renderScene = SceneMap({
  personal: PersonalStats,
  history: History,
})
export const Statistics = () => {
  const [routes] = useState([
    { key: 'personal', title: 'Personal Stats' },
    { key: 'history', title: 'History' },
  ])
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <Screen safeAreaMode="top">
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }} />
      </View>
    </Screen>
  );
};
