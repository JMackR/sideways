import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useOnboardingNavigation } from '../wizard-provider';

export const useDidFocusOnStep = (flowStep: number) => {
  const navigation = useNavigation();
  const { setScreenIndex } = useOnboardingNavigation();
  const route = useRoute();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScreenIndex(flowStep);
    });
    return unsubscribe;
  }, [navigation]);
};
