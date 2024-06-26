import { Screen } from '@upward/core-ui-widgets';
import { Text, View } from 'react-native';
import LandingPage from './charts/app';
export const Store = () => {
  return (
    <Screen safeAreaMode="top">
      <LandingPage />
    </Screen>
  );
};
