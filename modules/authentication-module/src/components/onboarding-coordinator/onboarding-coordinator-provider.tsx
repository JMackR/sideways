import { NavigableRoute } from '@upward/navigation';
import type { PropsWithChildren } from 'react';
import React, { useContext } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { OnboardingStep } from './constants';
import type { OnboardingViewModel } from './onboarding-models';
import { useOnboardingNavigation, useNextButtonValidationForKeys } from '..//wizard-provider';
import { useSelector } from 'react-redux';
import { RootState } from '@upward/store';
import { useAuthBootstrap } from '@upward/authentication';

export interface CoordinatorContextProps {
  screenIndex: number;
  isViewingLastScreen?: boolean;
  viewModels: OnboardingViewModel[];
  viewModel: OnboardingViewModel | undefined;
  handleFooterButtonClicked: (props?: string) => void;
  exitFlow?: () => void;
  toPrevStep: (props?: string) => void;
}

const CoordinatorContext = React.createContext<CoordinatorContextProps>({
  screenIndex: OnboardingStep.STEP_1,
  isViewingLastScreen: false,
  viewModels: [],
  viewModel: undefined,
  handleFooterButtonClicked: () => {},
  exitFlow: () => {},
  toPrevStep: () => {},
});

export const useCoordinator = () => {
  return useContext(CoordinatorContext);
};

export const CoordinatorProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { screenIndex, viewModels, setScreenIndex } = useOnboardingNavigation();
  const navigation = useNavigation<any>();
  const isViewingLastScreen = screenIndex === viewModels.length - 1;
  const viewModel = viewModels[screenIndex];
  const wizardSteps = useSelector((state: RootState) => state.auth?.wizardSteps);
  const { setUserAuthorizedState, setUserEnrollment } = useAuthBootstrap();
  const { runValidators } = useNextButtonValidationForKeys(viewModel?.validationKeys);

  const toPrevStep = async () => {
    const prevIndex = viewModels[screenIndex - 1];
    if (screenIndex === 0) {
      return await navigation.navigate(NavigableRoute.ONBOARDING_LANDING);
    }
    setScreenIndex(screenIndex - 1);
  };
  const step_0_Pressed = async () => {
    await navigation.navigate(viewModel.nextScreen);
    setScreenIndex(OnboardingStep.STEP_1);
  };

  const step_1_Pressed = async () => {
    await navigation.navigate(viewModel.nextScreen);
    setScreenIndex(OnboardingStep.STEP_2);
  };

  const step_2_Pressed = async () => {
    await navigation.navigate(viewModel.nextScreen);
    setScreenIndex(OnboardingStep.STEP_3);
  };

  const step_3_Pressed = async () => {
    await navigation.navigate(viewModel.nextScreen);
    setScreenIndex(OnboardingStep.STEP_4);
  };

  const step_4_Pressed = async () => {
    console.log('fire', viewModel.nextScreen, OnboardingStep.STEP_5);

    await navigation.navigate(viewModel.nextScreen);
    setScreenIndex(OnboardingStep.STEP_5);
  };

  const step_5_Pressed = async () => {
    await navigation.navigate(viewModel.nextScreen);
    setScreenIndex(OnboardingStep.STEP_6);
  };

  const step_6_Pressed = async () => {
    await navigation.navigate(viewModel.nextScreen);
    setScreenIndex(OnboardingStep.STEP_7);
  };

  const step_7_Pressed = async () => {
    await navigation.navigate(viewModel.nextScreen);
    setScreenIndex(OnboardingStep.STEP_8);
  };

  const step_8_Pressed = async () => {
    console.log('FIRE FINAL');
    // setUserEnrollment(true)
    // setUserAuthorizedState(true)
    await navigation.navigate(NavigableRoute.NOTIFICATION_PERMISSIONS);
    // await navigation.navigate(viewModel.nextScreen);
    // setScreenIndex(OnboardingStep.STEP_2);
  };

  const step_9_Pressed = async () => {};

  const footerActionForScreenIndex: { [key: number]: (props: any) => void } = {
    0: step_0_Pressed,
    1: step_1_Pressed,
    2: step_2_Pressed,
    3: step_3_Pressed,
    4: step_4_Pressed,
    5: step_5_Pressed,
    6: step_6_Pressed,
    7: step_7_Pressed,
    8: step_8_Pressed,
    9: step_9_Pressed,
  };

  const exitFlow = () => {
    navigation.navigate(NavigableRoute.Home).then(() => {
      Navigation.performWhenAvailable(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: NavigableRoute.HomeStack },
              // {
              //   name: 'Profile',
              // },
            ],
          }),
        );
      });
    });
  };

  const values = {
    screenIndex,
    isViewingLastScreen,
    viewModels,
    viewModel,
    toPrevStep,
    handleFooterButtonClicked: (props?: string) => footerActionForScreenIndex[screenIndex](props),
    // exitFlow,
  };

  return <CoordinatorContext.Provider value={values}>{children}</CoordinatorContext.Provider>;
};
