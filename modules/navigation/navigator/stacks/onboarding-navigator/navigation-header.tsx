import { useNavigation } from '@react-navigation/native';
import { CancelIcon, RightArrow } from '@upward/assets';
import { useCoordinator } from '@upward/authentication';

import { Flex, Separator } from '@upward/core-ui-library';
import type { NavigationBarProps } from '@upward/core-ui-widgets';
import { NavigationBar } from '@upward/core-ui-widgets';
import { NavigableRoute } from '@upward/navigation';
import React from 'react';

export const NavigationHeader = () => {
  const { screenIndex, viewModel, viewModels } = useCoordinator();
  // const { setScreenIndex } = useOnboardingNavigation();
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (viewModel?.flowStep === 0) {
      return navigation.navigate(NavigableRoute.HOME_STACK);
    }
    if (viewModel.backStep) {
      setScreenIndex(viewModel.backStep);
      navigation.goBack();
    } else {
      setScreenIndex(screenIndex - 1);
      navigation.goBack();
    }
  };
  // const handleClosePress = () => {
  //   navigation.navigate(NavigableRoute.HOME_STACK);
  // };

  const navigationBarPropsA: NavigationBarProps = {
    testID: 'onboarding-people.navigation-bar',
    title: viewModel?.headerTitle?.toUpperCase(),
    textType: viewModel?.textType,
    showShadow: false,
    barItemsTint: 'primary3',
    backgroundColor: 'background1',
    // leftItems: [
    //   {
    //     pressHandler: handleBackPress,
    //     textType: 'headline1',
    //     testID: 'onboarding-people.done',
    //     icon: { ...RightArrow, size: { width: 26, height: 26 } },
    //   },
    // ],
    // rightItems: [
    //   {
    //     pressHandler: handleClosePress,
    //     textType: 'headline1',
    //     testID: 'onboarding-people.done',
    //     icon: { ...CancelIcon, size: { width: 15, height: 15 } },
    //   },
    // ],
  };

  return (
    <Flex direction={'column'} grow={1} height={57}>
      {/* <StatusBar hidden /> */}

      <NavigationBar {...navigationBarPropsA} />

      <Separator />
    </Flex>
  );
};
